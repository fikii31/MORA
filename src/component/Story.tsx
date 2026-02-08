import './Story.css';
import BackgroundStory from '../assets/Background(3).png';

const Story = () => {
    return (
        <section className="story" id="Story">
            <img src={BackgroundStory} alt="Background Story" className="story-background" loading='lazy' />
            <div className="story-container">
                <h2 className="story-title">Our Story</h2>
                <p className="story-description">
                    Mora lahir dari sebuah gagasan sederhana: bahwa kopi bukan sekadar minuman penahan kantuk, melainkan sebuah jeda yang berharga di tengah hiruk-pikuk dunia.
                    Nama Mora diambil dari filosofi tentang ketenangan dan ketahanan, melambangkan dedikasi kami untuk menyajikan kopi yang memiliki karakter kuat namun tetap nyaman dinikmati kapan saja.
                    Perjalanan kami dimulai dari pencarian biji kopi lokal pilihan yang diproses dengan presisi.
             
                    Kami percaya bahwa untuk menghasilkan rasa yang bersih (clean) dan autentik,
                    setiap detail mulai dari proses pemanggangan hingga teknik penyeduhan harus dilakukan dengan hati.
                
                 
                    Di Mora, kami tidak hanya menjual kopi. Kami menyediakan ruang bagi Anda untuk bertukar cerita, mencari inspirasi, atau sekadar menikmati waktu sendiri.
                    Dengan konsep desain yang modern dan minimalis, kami ingin setiap kunjungan Anda menjadi pengalaman yang menenangkan bagi pikiran dan lidah.
                </p>
            </div>
        </section>
    );
};

export default Story;