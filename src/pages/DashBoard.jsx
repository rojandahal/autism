import { useEffect, useState } from "react";
import classRoom from "../assets/classroom.jpg";
import faceTime from "../assets/facetime.jpg";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
function DashBoard() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = Cookies.get("role");
    console.log(role);
    setUserRole(role);
  }, [userRole]);

  return (
    <div className='container'>
      <div className='box-wrapper'>
        {userRole === "teacher" ? (
          <Link to='/create-question'>
            <div className='content-box'>
              <div className='box-top'>
                <img
                  src={classRoom}
                  className='img-responsive'
                  alt=''
                />
              </div>
              <h4>Create Questions</h4>
              <p>Create a question for students</p>
            </div>
          </Link>
        ) : (
          <div className='content-box'>
            <div className='box-top'>
              <img
                src={classRoom}
                className='img-responsive'
                alt=''
              />
            </div>
            <h4>Class Room</h4>
            <p>Learner are able to learn and test themselves</p>
          </div>
        )}
        <div className='content-box'>
          <div className='box-top'>
            <img
              src={faceTime}
              className='img-responsive'
              alt=''
            />
          </div>
          <h4>Facetime</h4>
          <p>Learner will be able to communicate with tutor</p>
        </div>
      </div>
    </div>
  );
}
export default DashBoard;
