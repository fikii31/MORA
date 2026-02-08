import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials in environment variables')
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)

export interface ReviewData {
  id?: string;
  nama: string;
  email?: string;
  rating: number;
  message?: string;
  date?: string;
  created_at?: string;
}

// Add a new review to Supabase
export const addReview = async (review: Omit<ReviewData, 'id' | 'created_at'>) => {
  try {
    const { data, error } = await supabase
      .from('DB_Reviews')
      .insert([
        {
          nama: review.nama,
          email: review.email || '',
          rating: review.rating,
          message: review.message || '',
          date: review.date || new Date().toLocaleDateString('id-ID'),
        },
      ])
      .select()

    if (error) {
      console.error('Error adding review:', error)
      throw error
    }
    return data
  } catch (err) {
    console.error('Failed to add review:', err)
    throw err
  }
}

// Get all reviews from Supabase
export const getReviews = async (): Promise<ReviewData[]> => {
  try {
    const { data, error } = await supabase
      .from('DB_Reviews')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching reviews:', error)
      throw error
    }
    return data || []
  } catch (err) {
    console.error('Failed to fetch reviews:', err)
    return []
  }
}

// Delete a review from Supabase
export const deleteReview = async (reviewId: string) => {
  try {
    const { error } = await supabase
      .from('DB_Reviews')
      .delete()
      .eq('id', reviewId)

    if (error) {
      console.error('Error deleting review:', error)
      throw error
    }
  } catch (err) {
    console.error('Failed to delete review:', err)
    throw err
  }
}

// Subscribe to real-time updates
export const subscribeToReviews = (callback: (reviews: ReviewData[]) => void) => {
  const subscription = supabase
    .channel('public:DB_Reviews')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'DB_Reviews' },
      () => {
        // Fetch updated reviews when there's a change
        getReviews().then(callback)
      }
    )
    .subscribe()

  return subscription
}