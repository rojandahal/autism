import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className='container'>
      <div className='main-page'>
        <div className='main-page-wrapper'>
          <div className='children-box'>
            <Link to='/login'>
              <div className='primary-btn'>I am children</div>
            </Link>
          </div>
          <div className='tutor-box'>
            <Link to='/login-tutor'>
              <div className='primary-btn'>I am tutor</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
