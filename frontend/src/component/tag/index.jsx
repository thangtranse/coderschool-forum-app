import { Cancel } from "@mui/icons-material";
import { Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState } from "react";

const Tags = ({ data, handleDelete }) => {
  return (
    <Box
      sx={{
        background: "#283240",
        height: "100%",
        display: "flex",
        padding: "0.4rem",
        margin: "0 0.5rem 0 0",
        justifyContent: "center",
        alignContent: "center",
        color: "#ffffff",
      }}
    >
      <Stack direction="row" gap={1}>
        <Typography>{data}</Typography>
        <Cancel
          sx={{ cursor: "pointer" }}
          onClick={() => {
            handleDelete(data);
          }}
        />
      </Stack>
    </Box>
  );
};

export default function InputTags({tags, setTags}) {
  const tagRef = useRef();

  const handleDelete = (value) => {
    const newtags = tags.filter((val) => val !== value);
    setTags(newtags);
  };

  const handleOnKeydown = (e) => {
    if (e.code === "Space" || e.code === "Enter") {
      setTags([...tags, tagRef.current.value]);
      tagRef.current.value = "";
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <TextField
        inputRef={tagRef}
        fullWidth
        variant="standard"
        size="small"
        sx={{ margin: "1rem 0" }}
        margin="none"
        placeholder={tags.length < 5 ? "Enter tags" : ""}
        onKeyDown={handleOnKeydown}
        InputProps={{
          startAdornment: (
            <Box sx={{ margin: "0 0.2rem 0 0", display: "flex" }}>
              {tags.map((data, index) => {
                return (
                  <Tags data={data} handleDelete={handleDelete} key={index} />
                );
              })}
            </Box>
          ),
        }}
      />
    </Box>
  );
}
