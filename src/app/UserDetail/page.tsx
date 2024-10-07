"use client";
import { Box, Button, Grid, Snackbar, TextField, Typography } from "@mui/material";
import { useState } from "react";
import CommonInput from "../Utils/CommonInput";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RestUrlsConstants } from "@/constant/rest-url.constant";
import axiosInstance from "../lib/axios";

interface user {
  origin_city: string;
  destination_city: string;
  start_date: string;
  country_name_origin: string;
  country_name_destination: string;
  end_date: string;
  first_name: string;
  last_name: string;
  user_id: string;
}
interface snackBarState {
  open: boolean;
  message: string;
}

const UserDetail = () => {
  const router = useRouter();
  const [snackBar, setSnackBar] = useState<snackBarState>({
    open: false,
    message: "",
  });
  const [error, setError] = useState<user>();
  const [userData, setUserData] = useState<user>({
    origin_city: "",
    destination_city: "",
    start_date: "",
    country_name_origin: "",
    country_name_destination: "",
    end_date: "",
    first_name: "",
    last_name: "",
    user_id: "",
  });
  const resetData = () => {
    setUserData({
      origin_city: "",
      destination_city: "",
      start_date: "",
      country_name_origin: "",
      country_name_destination: "",
      end_date: "",
      first_name: "",
      last_name: "",
      user_id: "",
    });
  };
  const validateFields = () => {
    let valid = true;
    const newError:user = {
      origin_city: "",
      destination_city: "",
      start_date: "",
      country_name_origin: "",
      country_name_destination: "",
      end_date: "",
      first_name: "",
      last_name: "",
      user_id:""
    };
    if (!userData.first_name) {
      newError.first_name = "First name is required";
      valid = false;
    }
    if (!userData.last_name) {
      newError.last_name = "Last name is required";
      valid = false;
    }
    if (!userData.origin_city) {
      newError.origin_city = "Origin city is required";
      valid = false;
    }
    if (!userData.destination_city) {
      newError.destination_city = "Destination city is required";
      valid = false;
    }
    if (!userData.country_name_origin) {
      newError.country_name_origin = "Country origin name is required";
      valid = false;
    }
    if (!userData.country_name_destination) {
      newError.country_name_destination = "Country destination name is required";
      valid = false;
    }
    setError(newError);
    return valid;
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!validateFields()) {
      return;
    }
    const payload = {
      origin_city: userData.origin_city,
      destination_city: userData.destination_city,
      start_date: userData.start_date,
      country_name_origin: userData.country_name_origin,
      country_name_destination: userData.country_name_destination,
      end_date: userData.end_date,
      first_name: userData.first_name,
      last_name: userData.last_name,
      user_id: userData.user_id,
    };
    try {
      const res = await axiosInstance.post(
        RestUrlsConstants.flight_details,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status) {
        setSnackBar({ open: true, message: res?.data?.message });
        router.push("/UserDetail");
        resetData();
      }
    } catch (error: any) {
      console.log(error);
      setSnackBar({ open: true, message: error?.response?.data?.message });
    }
  };

  const handleClose = () => {
    setSnackBar({ open: false, message: "" });
  };

  const close = () => {
    resetData();
    router.push("/");
  };
  console.log(error, "==========");

  return (
    <Box sx={{ py: 4, px: { xs: 2, sm: 6, md: 10, lg: 20 } }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              sx={{
                color: "#000",
                textAlign: "center",
                bgcolor: "gray",
                py: 1,
              }}
            >
              User Detail
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <CommonInput
              label="First Name"
              type="text"
              placeholder="First name"
              value={userData.first_name}
              required={false}
              onChange={(e: any) =>
                setUserData({ ...userData, first_name: e.target.value })
              }
              error={!!error?.first_name}
              helperText={error?.first_name}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <CommonInput
              label="Last Name"
              type="text"
              placeholder="Last name"
              value={userData.last_name}
              required={false}
              onChange={(e: any) =>
                setUserData({ ...userData, last_name: e.target.value })
              }
              error={!!error?.last_name}
              helperText={error?.last_name}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <CommonInput
              label="Origin city"
              type="text"
              placeholder="Origin city"
              value={userData.origin_city}
              required={false}
              onChange={(e: any) =>
                setUserData({ ...userData, origin_city: e.target.value })
              }
              error={!!error?.origin_city}
              helperText={error?.origin_city}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <CommonInput
              label="Destination city"
              type="text"
              placeholder="Destination city"
              value={userData.destination_city}
              required={false}
              onChange={(e: any) =>
                setUserData({ ...userData, destination_city: e.target.value })
              }
              error={!!error?.destination_city}
              helperText={error?.destination_city}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <CommonInput
              label="Country name origin"
              type="text"
              placeholder="Country name origin"
              value={userData.country_name_origin}
              required={false}
              onChange={(e: any) =>
                setUserData({
                  ...userData,
                  country_name_origin: e.target.value,
                })
              }
              error={!!error?.country_name_origin}
              helperText={error?.country_name_origin}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <CommonInput
              label="Country name destination"
              type="text"
              placeholder="Country name destination"
              value={userData.country_name_destination}
              required={false}
              onChange={(e: any) =>
                setUserData({
                  ...userData,
                  country_name_destination: e.target.value,
                })
              }
              error={!!error?.country_name_destination}
              helperText={error?.country_name_destination}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <CommonInput
              label="Start date"
              type="date"
              placeholder="Start date"
              value={userData.start_date}
              required={false}
              onChange={(e: any) =>
                setUserData({ ...userData, start_date: e.target.value })
              }
              error={!!error?.start_date}
              helperText={error?.start_date}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <CommonInput
              label="End date"
              type="date"
              placeholder="End date"
              value={userData.end_date}
              required={false}
              disabled={!userData.start_date}
              onChange={(e: any) =>
                setUserData({ ...userData, end_date: e.target.value })
              }
              error={!!error?.end_date}
              helperText={error?.end_date}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CommonInput
              label="User id"
              type="text"
              placeholder="user id"
              value={userData.user_id}
              required={false}
              onChange={(e: any) =>
                setUserData({ ...userData, user_id: e.target.value })
              }
              error={!!error?.user_id}
              helperText={error?.user_id}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                justifyContent: { xs: "center", sm: "center", md: "end" },
              }}
            >
              <Button
                variant="contained"
                sx={{
                  color: "#fff",
                  background: "gray",
                  ":hover": { background: "gray" },
                }}
                onClick={close}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  color: "#fff",
                  background: "linear-gradient(to left,red 0%, yellow 190%)",
                }}
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackBar.open}
        onClose={handleClose}
        autoHideDuration={2000}
        message={snackBar.message}
        key={"top" + "center"}
      />
    </Box>
  );
};
export default UserDetail;
