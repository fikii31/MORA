import './Rating.css';
import { useState } from 'react';

interface ReviewData {
  id: string;
  name: string;
  email: string;
  rating: number;
  message: string;
  date: string;
}

const Rating = () => {
  const [showForm, setShowForm] = useState(false);
  const [reviews, setReviews] = useState<ReviewData[]>(() => {
    const savedReviews = localStorage.getItem('moraReviews');
    return savedReviews ? JSON.parse(savedReviews) : [];
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    message: '',
  });
  const reviewsPerPage = 3;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert('Mohon lengkapi semua data');
      return;
    }

    const newReview: ReviewData = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      rating: formData.rating,
      message: formData.message,
      date: new Date().toLocaleDateString('id-ID'),
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('moraReviews', JSON.stringify(updatedReviews));
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
          {reviews.length === 0 ? (
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
                        <h3 className="review-name">{review.name}</h3>
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

            <button type="submit" className="btn-submit">
              Submit Review
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Rating;
