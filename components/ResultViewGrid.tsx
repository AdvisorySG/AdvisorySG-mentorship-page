import React, { useState, useEffect, lazy, Suspense } from "react";
import { Modal, Button, CardActionArea } from "@mui/material";

import type { DisplayResult } from "./ResultView";
const LazyResultViewList = lazy(() => import("./ResultViewList"));

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import "../styles/ResultView.css";

const ResultViewGrid = ({
  displayResult,
}: {
  displayResult: DisplayResult;
}) => {
  const {
    displayName,
    displayOrganisation,
    displayRole,
    thumbnailImageUrl,
    uuid,
  } = displayResult;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    const newUrl = `${window.location.origin}${window.location.pathname}?uid=${uuid}`;
    window.history.pushState({ uuid }, "", newUrl);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    window.history.pushState({}, "", window.location.pathname);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const uidFromUrl = searchParams.get("uid");
    if (uidFromUrl === uuid) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }

    const handlePopState = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const uidFromUrl = searchParams.get("uid");
      if (uidFromUrl !== uuid) {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [uuid]);

  return (
    <Card
      className="sui-resultgrid"
      style={{
        width: "100%",
        height: "auto",
        padding: "0px",
      }}
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
        data-umami-event="Read more"
        data-umami-event-name={displayName}
        data-umami-event-organisation={displayOrganisation}
        data-umami-event-role={displayRole}
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
          <Button
            onClick={handleOpen}
            style={{ fontSize: 12 }}
            data-umami-event="Read more"
            data-umami-event-name={displayName}
            data-umami-event-organisation={displayOrganisation}
            data-umami-event-role={displayRole}
          >
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
          <LazyResultViewList
            displayResult={displayResult}
            isShowReadMore={false}
          />
        </Suspense>
      </Modal>
    </Card>
  );
};

export default ResultViewGrid;
