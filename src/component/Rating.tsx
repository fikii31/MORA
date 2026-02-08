import './Rating.css';
import { useState, useEffect } from 'react';
import { addReview, getReviews } from '../lib/RiviewDb';
import type { ReviewData } from '../lib/RiviewDb';

const Rating = () => {
  const [showForm, setShowForm] = useState(false);
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const reviewsPerPage = 3;

  // Load reviews from Supabase on component mount
  useEffect(() => {
    const loadReviews = async () => {
      setIsLoading(true);
      try {
        const data = await getReviews();
        setReviews(data);
      } catch (err) {
        console.error('Failed to load reviews:', err);
        // Fallback to localStorage if Supabase fetch fails
        const savedReviews = localStorage.getItem('moraReviews');
        if (savedReviews) {
          setReviews(JSON.parse(savedReviews));
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert('Mohon lengkapi semua data');
      return;
    }

    setIsSubmitting(true);
    try {
      // Add review to Supabase
      const result = await addReview({
        nama: formData.name,
        email: formData.email,
        rating: formData.rating,
        message: formData.message,
        date: new Date().toLocaleDateString('id-ID'),
      });

      if (result && result.length > 0) {
        // Add the new review to the local state
        const newReview: ReviewData = {
          id: result[0].id,
          nama: formData.name,
          email: formData.email,
          rating: formData.rating,
          message: formData.message,
          date: new Date().toLocaleDateString('id-ID'),
          created_at: result[0].created_at,
        };

        setReviews([newReview, ...reviews]);
        setCurrentSlide(0);

        // Reset form
        setFormData({
          name: '',
          email: '',
          rating: 5,
          message: '',
        });
        setShowForm(false);
        alert('Terima kasih untuk review Anda!');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Gagal mengirim review. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextSlide = () => {
    const maxSlide = Math.ceil(reviews.length / reviewsPerPage) - 1;
    if (currentSlide < maxSlide) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const getDisplayedReviews = () => {
    const startIndex = currentSlide * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    return reviews.slice(startIndex, endIndex);
  };

  const totalSlides = Math.ceil(reviews.length / reviewsPerPage);

  const renderStars = (rating: number, isClickable: boolean = false) => {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? 'filled' : ''}`}
            onClick={() => isClickable && handleRatingChange(star)}
            style={{ cursor: isClickable ? 'pointer' : 'default' }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <section className="rating" id="Rating">
      <div className="rating-container">
        <h2 className="rating-title">Customer Reviews & Ratings</h2>
        <p className="rating-subtitle">
          Lihat apa yang dikatakan pelanggan kami tentang MORA Kafe
        </p>

        {/* Reviews Carousel */}
        <div className="reviews-carousel-container">
          {isLoading ? (
            <div className="empty-state">
              <p>Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="empty-state">
              <p>Belum ada review. Jadilah yang pertama memberikan review!</p>
            </div>
          ) : (
            <>
              <button
                className="carousel-btn prev-btn"
                onClick={handlePrevSlide}
                disabled={currentSlide === 0}
              >
                ❮
              </button>

              <div className="reviews-list">
                {getDisplayedReviews().map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <div className="review-info">
                        <h3 className="review-name">{review.nama}</h3>
                        <p className="review-date">{review.date}</p>
                      </div>
                      {renderStars(review.rating)}
                    </div>
                    <p className="review-message">{review.message}</p>
                  </div>
                ))}
              </div>

              <button
                className="carousel-btn next-btn"
                onClick={handleNextSlide}
                disabled={currentSlide === totalSlides - 1}
              >
                ❯
              </button>
            </>
          )}
        </div>

        {/* Carousel Indicators */}
        {reviews.length > 0 && (
          <div className="carousel-indicators">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <div
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        )}

        {/* Give Feedback Button */}
        <div className="feedback-button-container">
          <button
            className="btn-give-feedback"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'Give Me Feedback'}
          </button>
        </div>

        {/* Feedback Form */}
        {showForm && (
          <form className="review-form" onSubmit={handleSubmit}>
            <h3 className="form-title">Share Your Experience</h3>

            <div className="form-group">
              <label htmlFor="name">Nama:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Masukkan nama Anda"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Masukkan email Anda"
                required
              />
            </div>

            <div className="form-group">
              <label>Rating:</label>
              <div className="rating-selector">
                {renderStars(formData.rating, true)}
                <span className="rating-value">{formData.rating} dari 5</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Ulasan Anda:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Bagikan pengalaman Anda di MORA Kafe..."
                required
                rows={5}
              />
            </div>

            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Mengirim...' : 'Submit Review'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Rating;
