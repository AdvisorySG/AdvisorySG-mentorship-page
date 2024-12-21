import React, { Suspense, lazy, useEffect, useRef, useState } from "react";

import { Modal, Button, CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useInView } from "react-intersection-observer";

import type { DisplayResult } from "./ResultView";
const LazyResultViewList = lazy(() => import("./ResultViewList"));
import "../styles/ResultView.css";

const ResultViewGrid = ({
  displayResult,
}: {
  displayResult: DisplayResult;
}) => {
  const { ref, inView } = useInView();

  const {
    id,
    displayName,
    displayOrganisation,
    displayRole,
    thumbnailImageUrl,
  } = displayResult;

  const inViewRef = useRef(false);
  useEffect(() => {
    if (!inViewRef.current && inView) {
      inViewRef.current = true;
      window.umami.track("Impression", { id, env: process.env.NODE_ENV });
    }
  }, [id, inView]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Inspired by code from https://github.com/AdvisorySG/mentorship-page/pull/731/commits/b234ec556bc6d7de94432bb2f2a87573c20963ba
  const handleOpen = () => {
    // Open the modal
    const newUrl = `${window.location.origin}${window.location.pathname}?uid=${id}`;
    window.history.pushState({ id }, "", newUrl);
    setIsModalOpen(true);

    // Track interaction
    window.umami.track("Click", { id, env: process.env.NODE_ENV });

    // Log
    console.log(
      "ResultViewGrid :: handleOpen : new modal opened with URL",
      newUrl,
    );
  };

  const handleClose = () => {
    if (window.history.state && window.history.state.id === id) {
      // Case 1: User clicked into the modal -> We should execute `window.history.back()` to return to the previous URL
      console.log("ResultViewGrid :: handleClose :: going back");
      window.history.back();
    } else {
      // Case 2: User came from a direct link -> We should clear the query string (since we don't know what the previous URL was)
      console.log("ResultViewGrid :: handleClose :: clearing query string");
      const newUrl = `${window.location.origin}${window.location.pathname}`;
      window.history.replaceState(null, "", newUrl);
    }

    setIsModalOpen(false);
  };

  useEffect(() => {
    // We should open this modal if the URL's `uid` query parameter matches this modal's `id`
    const searchParams = new URLSearchParams(window.location.search);
    const uidFromUrl = searchParams.get("uid");
    if (uidFromUrl === id) {
      console.log("ResultViewGrid :: useEffect :: open the modal");
      setIsModalOpen(true);
    }
  }, [id]);

  return (
    <Card
      className="sui-resultgrid"
      style={{
        width: "100%",
        height: "auto",
        padding: "0px",
      }}
      ref={ref}
    >
      <CardActionArea
        onClick={handleOpen}
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          alignItems: "stretch",
          justifyContent: "flex-start",
          height: "100%",
        }}
      >
        <CardMedia
          component="img"
          image={thumbnailImageUrl}
          style={{
            width: "100%",
            height: "180px",
          }}
        />
        <CardContent>
          {displayName && (
            <span
              className="sui-result__title"
              style={{ fontSize: 18 }}
              dangerouslySetInnerHTML={{ __html: displayName }}
            />
          )}
          <ul className="sui-result__details" style={{ padding: 0 }}>
            {displayOrganisation && (
              <li style={{ margin: "5px 0" }}>
                <span
                  className="sui-result__value"
                  style={{ fontSize: 14 }}
                  dangerouslySetInnerHTML={{ __html: displayOrganisation }}
                />
              </li>
            )}
            {displayRole && (
              <li style={{ margin: "5px 0" }}>
                <span
                  className="sui-result__value"
                  style={{ fontSize: 14 }}
                  dangerouslySetInnerHTML={{ __html: displayRole }}
                />
              </li>
            )}
          </ul>
        </CardContent>
        <CardActions
          style={{ display: "flex", flexGrow: 1, alignItems: "flex-end" }}
        >
          <Button onClick={handleOpen} style={{ fontSize: 12 }}>
            Read More
          </Button>
        </CardActions>
      </CardActionArea>
      <Modal
        className="sui-result__modal"
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        style={{
          display: "flex",
          alignItems: "flex-start",
          margin: "auto",
          maxWidth: "800px",
          maxHeight: "80%",
          overflow: "auto",
        }}
      >
        <Suspense fallback={null}>
          <LazyResultViewList displayResult={displayResult} />
        </Suspense>
      </Modal>
    </Card>
  );
};

export default ResultViewGrid;
