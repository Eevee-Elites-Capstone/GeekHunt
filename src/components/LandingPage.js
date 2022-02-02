import React from "react";
import "./landingPage.css"
import Navbar from "./UI/Navbar";

const LandingPage = () => {
  return (
    <div className="landingPage_container">
      <Navbar />
      <div className="landingPage_header">

        <div className="landingPage_header-text">
          <h1>Hire and work with exceptional Talent</h1>
        </div>
      </div>

      <div className="landingPage_users">
        <div className="landingPage_users-info">
          <h2 className="landingPage_user-titles">For Freelancers</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>
        <div className="landingPage_users-info">
          <h2 className="landingPage_user-titles">For Bookers</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.
          </p>
        </div>
      </div>
      <div className="landingPage_talent">
        <p className="landingPage_user-titles">Our Talent</p>

        <div className="landingPage_talent-member">
          <div className="landingPage_talent-info">
            <div className="landingPage_talent-picture">
            </div>
            <div className="landingPage_talent-details">
              <p>Name:</p>
              <p>Title:</p>
              <p>From:</p>
            </div>
          </div>
        </div>

        <div className="landingPage_talent-member">
          <div className="landingPage_talent-info">
            <div className="landingPage_talent-picture">
            </div>
            <div className="landingPage_talent-details">
              <p>Name:</p>
              <p>Title:</p>
              <p>From:</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default LandingPage;
