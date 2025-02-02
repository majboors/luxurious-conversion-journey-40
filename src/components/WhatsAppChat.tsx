import { useState } from 'react';

export const WhatsAppChat = () => {
  const [isVisible, setIsVisible] = useState(false);
  const phoneNumber = '923461115757'; 
  const presetMessage = 'Directly Contact our CEO!';

  const handleSendMessage = () => {
    const input = document.getElementById('chat-input') as HTMLTextAreaElement;
    if (input.value !== '') {
      const message = encodeURIComponent(input.value);
      const url = `https://wa.me/${phoneNumber}?text=${message}`;
      window.open(url, '_blank');
      input.value = '';
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <div id="whatsapp-chat" className={`fixed bottom-24 right-12 z-50 w-[360px] bg-white rounded-lg shadow-2xl transform transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
        <div className="whatsapp-chat-header bg-[#075e54] text-white p-4 rounded-t-lg flex items-center gap-3">
          <div className="whatsapp-chat-avatar w-10 h-10 rounded-full overflow-hidden">
            <img src="https://i.ibb.co/s90nbwpr/techrealm-logo.jpg" alt="Company Logo" className="w-full h-full object-cover" />
          </div>
          <p>
            <span className="whatsapp-chat-name font-semibold block">Web Development</span>
            <small className="text-gray-200">Typically replies within an hour</small>
          </p>
        </div>
        
        <div className='start-chat bg-[#DCF8C6] p-4'>
          <div className="whatsapp-chat-body">
            <div className="dAbFpq bg-white rounded-lg p-3 shadow-sm">
              <div className="eJJEeC">
                <div className="hFENyl">
                  <div className="ixsrax"></div>
                  <div className="dRvxoz"></div>
                  <div className="kXBtNt"></div>
                </div>
              </div>
              <div className="kAZgZq">
                <div className="bMIBDo font-semibold">Web Development</div>
                <div className="iSpIQi">Hi there 👋<br /><br />How can I help you?</div>
                <div className="cqCDVm text-xs text-gray-500">1:40</div>
              </div>
            </div>
          </div>

          <div className="blanter-msg flex items-center gap-2 bg-white p-4 mt-4 rounded-lg shadow-sm">
            <textarea
              id="chat-input"
              placeholder="Write a response"
              maxLength={120}
              className="flex-1 resize-none border-none focus:outline-none"
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={handleSendMessage}
              className="bg-[#4caf50] p-2 rounded-full hover:bg-[#45a049] transition-colors"
            >
              <svg viewBox="0 0 448 448" className="w-6 h-6 fill-white">
                <path d="M.213 32L0 181.333 320 224 0 266.667.213 416 448 224z"/>
              </svg>
            </button>
          </div>
        </div>
        <button
          className="close-chat absolute top-2 right-2 text-white text-2xl font-bold w-8 h-8 flex items-center justify-center hover:bg-[#063e39] rounded-full transition-colors"
          onClick={() => setIsVisible(false)}
        >
          ×
        </button>
      </div>

      <a
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(presetMessage)}`}
        className="blantershow-chat fixed bottom-8 right-8 bg-[#25d366] text-white p-4 rounded-full shadow-lg flex items-center gap-2 hover:bg-[#1ea952] transition-colors z-40"
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.preventDefault();
          setIsVisible(!isVisible);
        }}
      >
        <svg width="20" viewBox="0 0 24 24">
          <path fill="#eceff1" d="M20.5 3.4A12.1 12.1 0 0012 0 12 12 0 001.7 17.8L0 24l6.3-1.7c2.8 1.5 5 1.4 5.8 1.5a12 12 0 008.4-20.3z"/>
          <path fill="#4caf50" d="M12 21.8c-3.1 0-5.2-1.6-5.4-1.6l-3.7 1 1-3.7-.3-.4A9.9 9.9 0 012.1 12a10 10 0 0117-7 9.9 9.9 0 01-7 16.9z"/>
          <path fill="#fafafa" d="M17.5 14.3c-.3 0-1.8-.8-2-.9-.7-.2-.5 0-1.7 1.3-.1.2-.3.2-.6.1s-1.3-.5-2.4-1.5a9 9 0 01-1.7-2c-.3-.6.4-.6 1-1.7l-.1-.5-1-2.2c-.2-.6-.4-.5-.6-.5-.6 0-1 0-1.4.3-1.6 1.8-1.2 3.6.2 5.6 2.7 3.5 4.2 4.2 6.8 5 .7.3 1.4.3 1.9.2.6 0 1.7-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4z"/>
        </svg>
        Chat with Us
      </a>
    </>
  );
};