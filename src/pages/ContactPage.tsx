import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    console.log(data);
    setIsLoading(true);

    // 送信中を少し見せるためにタイマーセット
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000); // 1秒間はSending...表示
  };

  useEffect(() => {
    if (isSubmitted) {
      const timer1 = setTimeout(() => {
        setShowThankYou(true);
      }, 300); // フェードイン遅延

      const timer2 = setTimeout(() => {
        navigate('/');
      }, 3000); // 3秒後トップリダイレクト

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isSubmitted, navigate]);

  return (
    <>
      <Header />

      <div className="max-w-3xl mx-auto py-16 px-4 text-gray-800">
        {/* Thank youメッセージ */}
        {isSubmitted ? (
          <div className={`text-center transition-opacity duration-700 ${showThankYou ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="text-3xl font-bold mb-4">Thank you!</h1>
            <p className="text-gray-600">Your message has been sent. We'll get back to you soon.</p>
          </div>
        ) : (
          <>
            {/* タイトル */}
            <h1 className="text-4xl font-bold mb-4 text-center">Contact Us</h1>
            <p className="text-center text-gray-600 mb-10">
              We'd love to hear from you. Please fill out the form below and we'll get back to you shortly.
            </p>

            {/* フォーム */}
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  {...register('name', { required: 'Name is required.' })}
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  {...register('email', {
                    required: 'Email is required.',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email address format.',
                    },
                  })}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  {...register('message', { required: 'Message is required.' })}
                  placeholder="Write your message here..."
                  className="w-full border border-gray-300 px-4 py-2 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-md font-semibold transition 
                  ${isLoading ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'} 
                  text-white`}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            {/* FAQリンク */}
            <div className="text-center text-sm text-gray-500 mt-10">
              Looking for quick answers?{' '}
              <a href="/faq" className="underline hover:text-orange-500">
                Visit our FAQ
              </a>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default ContactPage;
