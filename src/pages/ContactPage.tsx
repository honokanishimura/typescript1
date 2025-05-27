import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'; // for form input and validation
import { useNavigate } from 'react-router-dom'; // to move between pages
import Header from '../components/Header';
import Footer from '../components/Footer';

// Define the data structure of the form
type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactPage = () => {
  // useForm gives us tools to handle the form
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  // Form state
  const [isLoading, setIsLoading] = useState(false); // true when sending
  const [isSubmitted, setIsSubmitted] = useState(false); // true when done
  const [showThankYou, setShowThankYou] = useState(false); // fade in "Thank you"
  const navigate = useNavigate(); // to go back to homepage

  // This runs when the form is submitted
  const onSubmit = (data: FormData) => {
    console.log(data); // show input in console
    setIsLoading(true); // show "Sending..."

    // Wait 1 second and then mark as done
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  // After form is sent, wait a bit and go back to home
  useEffect(() => {
    if (isSubmitted) {
      const timer1 = setTimeout(() => {
        setShowThankYou(true); // show message
      }, 300);

      const timer2 = setTimeout(() => {
        navigate('/'); // go home after 3 sec
      }, 3000);

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
        {/* If sent, show thank you */}
        {isSubmitted ? (
          <div className={`text-center transition-opacity duration-700 ${showThankYou ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="text-3xl font-bold mb-4">Thank you!</h1>
            <p className="text-gray-600">Your message has been sent. We'll get back to you soon.</p>
          </div>
        ) : (
          <>
            {/* Page title and description */}
            <h1 className="text-4xl font-bold mb-4 text-center">Contact Us</h1>
            <p className="text-center text-gray-600 mb-10">
              We'd love to hear from you. Please fill out the form below and we'll get back to you shortly.
            </p>

            {/* The form starts here */}
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Name input */}
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

              {/* Email input */}
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

              {/* Message input */}
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  {...register('message', { required: 'Message is required.' })}
                  placeholder="Write your message here..."
                  className="w-full border border-gray-300 px-4 py-2 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
              </div>

              {/* Send button */}
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

            {/* Link to FAQ */}
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
