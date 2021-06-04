import React, { useState } from "react";
import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ReactSelect from "react-select";
import { GET_USERS, UPDATE_WAITER } from "queries";
import { reactQueryConfig } from "constants/index";
import { useQuery, useMutation } from "react-query";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";
import Loader from "react-loader-spinner";
import "./modal.css";

const LinkingModal = ({
  open,
  onCloseModal,
  waitersData,
  refetchWaitersData,
}) => {
  const [userId, setuserId] = useState();
  const { mutate } = useMutation(UPDATE_WAITER);
  const {
    data: usersData,
    isLoading: usersIsLoading,
    isFetching: usersIsFetching,
    isError: usersIsError,
  } = useQuery(["GET_USERS"], GET_USERS, {
    ...reactQueryConfig,
  });

  let handleLinkWaiter = (id, user_id, waiterName, refetchData) => {
    let waiterDetails = {
      id: id,
      user_id: user_id,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Link them!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Action in Process!",
          text: "Please Wait...",
          onOpen: function () {
            Swal.showLoading();
          },
        });
        await mutate(waiterDetails, {
          onSuccess: async (e) => {
            await refetchData();
            Swal.fire(
              "Waiter Linked Successfully!",
              `${waiterName} has been Linked.`,
              "success"
            );
            onCloseModal();
          },
          onError: (e) => {
            Swal.fire({
              icon: "error",
              title: "Action Failed!",
              text: e?.response?.data?.message || `${waiterName} already connected with the user!`,
              onOpen: function () {
                Swal.hideLoading();
              },
            });
          },
        });
      }
    });
  };

  return (
    <Modal open={open} onClose={onCloseModal}>
      <h1
        style={{
          marginBottom: "1rem",
          paddingBottom: "1rem",
          borderBottom: "1px dashed grey",
          fontWeight: "bold",
          display: "flex",
        }}
      >
        Link waiters with users
        {(usersIsLoading || usersIsFetching) && (
          <span style={{ marginLeft: "1rem" }}>
            <Loader type="BallTriangle" color="black" height={30} width={30} />
          </span>
        )}
      </h1>
      <ReactSelect
        options={(usersData?.data || []).map((item) => ({
          label: item.email,
          value: item._id,
        }))}
        onChange={(item) => {
          setuserId(item.value);
        }}
      />
      <div
        style={{
          marginTop: "1rem",
          paddingTop: "1rem",
          borderTop: "1px dashed grey",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={() => {
            if (userId && waitersData) {
              handleLinkWaiter(
                waitersData.id,
                userId,
                waitersData.name,
                refetchWaitersData
              );
            }
          }}
          variant="contained"
          color="primary"
        >
          Link Waiter
        </Button>{" "}
        <Button onClick={onCloseModal} variant="contained" color="secondary">
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default LinkingModal;
