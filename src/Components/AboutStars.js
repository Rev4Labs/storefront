import React from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const AboutStars = () => {
  return (
    <Container>
      <h1 className="mt-4">Handling User Product Ratings</h1>
      <hr />
      <Row className="my-5">
        <h2>Using React-Star-Ratings (npm package)</h2>
        <p className="h4">A customizable react star ratings component.</p>
        <p className="h4">
          SVG stars that show aggregate star ratings to the hundreths decimal
          point.
        </p>
        <p className="h5">
          <a href="https://www.npmjs.com/package/react-star-ratings">
            https://www.npmjs.com/package/react-star-ratings
          </a>
        </p>
      </Row>
      <hr />
      <Row className="my-5">
        <h2>UI Indicator for a Product's Average Rating</h2>
        <p className="h4">Accepts rating as a prop.</p>
        <Image
          src="/images/star-indicator.png"
          rounded
          style={{ width: '50vw' }}
        />
      </Row>
      <hr />
      <Row className="my-5">
        <h2>UI Component to Rate a Product</h2>
        <p className="h4">
          Wrapper component to handle local state and the click event.
        </p>
        <Image
          src="/images/star-clickable.png"
          rounded
          style={{ width: '50vw' }}
        />
      </Row>
      <Container>
        <Row className="my-5">
          <h3>On Mount & Update</h3>
          <p className="h5">
            Take product id from props and user auth token from local storage.
          </p>
          <p className="h5">
            Fetch user rating (if it exists) for the product using API GET
            route.
          </p>
          <p className="h5">
            Set the local state to the user's rating if it exists.
          </p>
        </Row>
        <Row className="my-5">
          <h3>On Click</h3>
          <p className="h5">
            Call API POST route with productReview and auth token to create or
            update the user's rating.
          </p>
          <p className="h5">Update local state with the user's rating.</p>

          <Image
            className="mt-3"
            src="/images/review-click-handler.png"
            style={{ width: '65cqw' }}
            rounded
          />
        </Row>
        <Row className="my-5">
          <h3>API POST Route Creates/Updates Record in the Reviews Table</h3>
          <p className="h5">
            One route handles both creating and updating a review.
          </p>

          <Image
            src="/images/review-api-route.png"
            style={{ width: '65cqw' }}
            className="mt-3"
            rounded
          />
        </Row>
        <Row className="my-5">
          <h3>Sequelize Monitors the Reviews Table for Changes</h3>
          <p className="h5">
            Uses afterCreate, afterUpdate, and afterDestroy hooks.
          </p>
          <p className="h5">
            Triggers a function that calculates the new average rating for the
            given product.
          </p>
          <p className="h5">
            Updates the product's average rating and total number of reviews in
            the Products table.
          </p>
          <Image
            src="/images/review-data-model-hooks.png"
            style={{ width: '65cqw' }}
            className="mt-3"
            rounded
          />
        </Row>
      </Container>
    </Container>
  );
};

export default AboutStars;
