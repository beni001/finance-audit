import { supabase, handleSupabaseError } from '../lib/supabaseClient';
import { DebtData, Creditor, Loan, ProjectData } from '../types';

const checkSupabaseClient = () => {
  if (!supabase) {
    throw new Error('Supabase client is not initialized. Check your environment variables.');
  }
};

export const fetchDebtData = async (): Promise<DebtData[]> => {
  try {
    checkSupabaseClient();
    console.log('Fetching debt data...');
    const { data, error } = await supabase!
      .from('debt_data')
      .select('*')
      .order('year', { ascending: true });

    if (error) {
      console.error('Supabase error fetching debt data:', error);
      throw error;
    }
    console.log('Debt data fetched successfully:', data);
    return data as DebtData[];
  } catch (error) {
    console.error('Error in fetchDebtData:', error);
    handleSupabaseError(error);
    throw error;
  }
};

export const fetchCreditors = async (): Promise<Creditor[]> => {
  try {
    checkSupabaseClient();
    const { data, error } = await supabase!
      .from('creditors')
      .select('*');

    if (error) throw error;
    return data as Creditor[];
  } catch (error) {
    handleSupabaseError(error);
    throw error;
  }
};

export const fetchLoans = async (): Promise<Loan[]> => {
  try {
    checkSupabaseClient();
    const { data, error } = await supabase!
      .from('loans')
      .select('*')
      .order('year', { ascending: true });

    if (error) throw error;
    return data as Loan[];
  } catch (error) {
    handleSupabaseError(error);
    throw error;
  }
};

export const fetchProjects = async (): Promise<ProjectData[]> => {
  try {
    checkSupabaseClient();
    const { data, error } = await supabase!
      .from('projects')
      .select('*')
      .order('year', { ascending: true });

    if (error) throw error;
    return data as ProjectData[];
  } catch (error) {
    handleSupabaseError(error);
    throw error;
  }
};
