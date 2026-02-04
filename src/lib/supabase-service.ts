import { supabase } from '@/integrations/supabase/client';
import type { Decision, DecisionFormData, DecisionStatus } from '@/types/decision';

/**
 * Create a new decision in Supabase
 */
export async function createDecision(userId: string, data: DecisionFormData): Promise<Decision> {

  const { data: decision, error } = await supabase
    .from('decisions')
    .insert({
      user_id: userId,
      title: data.title,
      context: data.context,
      status: 'draft',
    })
    .select()
    .single();

  if (error) throw error;

  // Insert options
  if (data.options.length > 0) {
    const { error: optionsError } = await supabase
      .from('options')
      .insert(
        data.options
          .filter(o => o.label.trim())
          .map((opt, index) => ({
            decision_id: decision.id,
            label: opt.label,
            notes: opt.notes,
            sort_order: index,
          }))
      );
    if (optionsError) throw optionsError;
  }

  // Insert criteria
  if (data.criteria.length > 0) {
    const { error: criteriaError } = await supabase
      .from('criteria')
      .insert(
        data.criteria
          .filter(c => c.name.trim())
          .map(crit => ({
            decision_id: decision.id,
            name: crit.name,
            weight: crit.weight,
            description: crit.description,
          }))
      );
    if (criteriaError) throw criteriaError;
  }

  // Insert constraints
  if (data.constraints && data.constraints.length > 0) {
    const { error: constraintsError } = await supabase
      .from('constraints')
      .insert(
        data.constraints.map(cons => ({
          decision_id: decision.id,
          type: cons.type,
          value: cons.value,
          priority: cons.priority,
        }))
      );
    if (constraintsError) throw constraintsError;
  }

  // Fetch complete decision with relations
  return getDecision(decision.id);
}

/**
 * Get a single decision with all relations
 */
export async function getDecision(id: string): Promise<Decision> {
  // Check if this is a sample decision
  if (id.startsWith('sample-')) {
    // Import sample decisions dynamically to avoid circular dependencies
    const { getSampleDecisions } = await import('./sample-decisions');
    const sampleDecisions = getSampleDecisions();
    const sampleIndex = parseInt(id.replace('sample-', ''));
    const sample = sampleDecisions[sampleIndex];

    if (!sample) {
      throw new Error('Sample decision not found');
    }

    // Return sample decision with proper structure
    return {
      ...sample,
      id,
      user_id: 'sample',
      created_at: new Date(Date.now() - (sampleIndex + 1) * 86400000).toISOString(),
      updated_at: new Date(Date.now() - (sampleIndex + 1) * 86400000).toISOString(),
    } as Decision;
  }

  const { data, error } = await supabase
    .from('decisions')
    .select(`
      *,
      options (*),
      criteria (*),
      constraints (*)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as Decision;
}

/**
 * Get all decisions for the current user
 */
export async function getUserDecisions(userId: string, filters?: {
  status?: DecisionStatus[];
  search?: string;
}): Promise<Decision[]> {

  let query = supabase
    .from('decisions')
    .select(`
      *,
      options (*),
      criteria (*),
      constraints (*)
    `)
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  if (filters?.status && filters.status.length > 0) {
    query = query.in('status', filters.status);
  }

  if (filters?.search) {
    query = query.ilike('title', `%${filters.search}%`);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data as Decision[];
}

/**
 * Update decision status
 */
export async function updateDecisionStatus(
  id: string,
  status: DecisionStatus
): Promise<void> {
  const { error } = await supabase
    .from('decisions')
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) throw error;
}

/**
 * Save analysis result to decision
 */
export async function saveAnalysisResult(
  id: string,
  result: any
): Promise<void> {
  const { error } = await supabase
    .from('decisions')
    .update({
      result_json: result,
      status: 'done',
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) throw error;
}

/**
 * Update decision (title, context, etc.)
 */
export async function updateDecision(
  id: string,
  updates: Partial<DecisionFormData>
): Promise<Decision> {
  const { error } = await supabase
    .from('decisions')
    .update({
      title: updates.title,
      context: updates.context,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) throw error;

  return getDecision(id);
}

/**
 * Delete a decision (sets to archived)
 */
export async function archiveDecision(id: string): Promise<void> {
  await updateDecisionStatus(id, 'archived');
}

/**
 * Hard delete a decision
 */
export async function deleteDecision(id: string): Promise<void> {
  const { error } = await supabase
    .from('decisions')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
