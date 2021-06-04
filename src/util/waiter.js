import Swal from "sweetalert2";

export let checkWaiterName = (item) => {
  return item?.user_id?.full_name || item?.full_name;
};

export let pad = (n, width, z) => {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export let alterWaiterStatus = (status) => {
  if(status === 'active'){
    return 'confirmed'
  }
  else if(status === 'reject'){
    return 'rejected'
  }
  else{
    return status;
  }
};

export let handleAction = (body, name, actionLabel, mutate, refetchData, extraLabel) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: `Yes, Continue!`,
  }).then(async (result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Action in Process!",
        text: "Please Wait...",
        onOpen: function () {
          Swal.showLoading();
        },
      });
      await mutate(body, {
        onSuccess: async (e) => {
          await refetchData();
          Swal.fire(
            `Waiter ${extraLabel || ''} ${actionLabel} Successfully!`,
            `${name} ${extraLabel || ''} has been ${actionLabel}.`,
            "success"
          );
        },
        onError: (res) => {
          Swal.fire({
            icon: "error",
            title: "Action Failed!",
            text: res?.response?.data?.message || `The action has been failed.`,
            onOpen: function () {
              Swal.hideLoading();
            },
          });
        },
      });
    }
  });
};
