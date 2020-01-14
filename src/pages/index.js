import Container from "components/Container";
import Layout from "components/Layout";
import Map from "components/Map";
import React from "react";
import Helmet from "react-helmet";

const LOCATION = {
  lat: 38.9072,
  lng: -77.0369
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;

const IndexPage = () => {
  /**
   * mapEffect
   * @description Fires a callback once the page renders
   * @example Here this is and example of being used to zoom in and set a popup on load
   */

  async function mapEffect({ leafletElement } = {}) {
    let route, routeJson;
    if (!leafletElement) return;
    try {
      route = await fetch(
        "https://firebasestorage.googleapis.com/v0/b/santa-tracker-firebase.appspot.com/o/route%2Fsanta_en.json?alt=media&2018b"
      );
      routeJson = await route.json();
    } catch (e) {
      console.log(`Failed to find Santa!: ${e}`);
    }
    console.log("routeJson", routeJson);
    const { destinations = [] } = routeJson || {};
    const destinationsVisited = destinations.filter(({arrival}) => arrival < Date.now());
    const destinationsWithPresents = destinationsVisited.filter(({presentsDelivered}) => presentsDelivered > 0);
    const lastKnownDestination = destinationsWithPresents[destinationsWithPresents.length - 1];
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: "OpenStreetMap",
    zoom: DEFAULT_ZOOM,
    mapEffect
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <Map {...mapSettings}></Map>

      <Container type="content" className="text-center home-start">
        <h2>Still Getting Started?</h2>
        <p>Run the following in your terminal!</p>
        <pre>
          <code>
            gatsby new [directory]
            https://github.com/colbyfayock/gatsby-starter-leaflet
          </code>
        </pre>
        <p className="note">
          Note: Gatsby CLI required globally for the above command
        </p>
      </Container>
    </Layout>
  );
};

export default IndexPage;
