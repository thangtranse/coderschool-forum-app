// React
import React, { useEffect, useState } from "react";
// Material
import { TextField } from "@mui/material";
import { Mention, MentionsInput } from "react-mentions";

const defaultMentionStyle = {
  backgroundColor: "#cee4e5",
};

const emojiExampleStyle = {
  control: {
    fontSize: 16,
    lineHeight: 1.2,
    minHeight: 163,
  },

  highlighter: {
    padding: 9,
    border: "1px solid transparent",
  },

  input: {
    fontSize: 16,
    lineHeight: 1.2,
    padding: 9,
    border: "1px solid silver",
  },

  suggestions: {
    list: {
      backgroundColor: "white",
      border: "1px solid rgba(0,0,0,0.15)",
      fontSize: 16,
    },

    item: {
      padding: "5px 15px",
      borderBottom: "1px solid rgba(0,0,0,0.15)",

      "&focused": {
        backgroundColor: "#cee4e5",
      },
    },
  },
};

function InputPostComponent({
  title = "",
  content = "",
  isReview = false,
  option: { onSetIsChange, onSetTitle, onSetContent, onSetIsReview },
}) {
  const [emojis, setEmojis] = useState([]);

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/oliveratgithub/0bf11a9aff0d6da7b46f1490f86a71eb/raw/d8e4b78cfe66862cf3809443c1dba017f37b61db/emojis.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        setEmojis(jsonData.emojis);
      });
  }, []);

  const queryEmojis = (query, callback) => {
    if (query.length === 0) return;
    const matches = emojis
      .filter((emoji) => {
        return emoji.name.indexOf(query.toLowerCase()) > -1;
      })
      .slice(0, 10);
    return matches.map(({ emoji }) => ({ id: emoji }));
  };

  const onEditorChange = (e) => {
    onSetContent(e.target.value);
  };

  return (
    <>
      <TextField
        sx={{ display: isReview ? "none" : "block" }}
        label="Tiêu đề"
        value={title}
        onChange={(event) => {
          onSetTitle(event.target.value);
        }}
        fullWidth
        margin="normal"
        required
      />
      <MentionsInput
        style={{ ...emojiExampleStyle, display: isReview ? "none" : "block" }}
        value={content}
        onChange={onEditorChange}
        placeholder={"Press ':' for emojis, mention people using '@'"}
      >
        <Mention
          trigger="@"
          markup="@__id__"
          data={users}
          regex={/@(\S+)/}
          style={defaultMentionStyle}
          appendSpaceOnAdd
          renderSuggestion={(entry) => {
            return `@${entry.id}`;
          }}
          displayTransform={(id, display) => {
            return `@${display}`;
          }}
        />
        <Mention
          trigger="#"
          markup="#__id__"
          data={hashTag}
          regex={/#(\S+)/}
          style={defaultMentionStyle}
          appendSpaceOnAdd
          renderSuggestion={(entry) => {
            return `#${entry.id}`;
          }}
          displayTransform={(id, display) => {
            return `#${display}`;
          }}
        />
        <Mention
          trigger=":"
          markup="__id__"
          regex={/($a)/}
          data={queryEmojis}
        />
      </MentionsInput>
    </>
  );
}

export default InputPostComponent;

const users = [
  {
    id: "isaac",
    display: "Isaac Newton",
  },
  {
    id: "sam",
    display: "Sam Victor",
  },
  {
    id: "emma",
    display: "emmanuel@nobody.com",
  },
];
const hashTag = [
  {
    id: "minhthang",
    display: "Isaac Newton",
  },
  {
    id: "sam",
    display: "Sam Victor",
  },
  {
    id: "emma",
    display: "emmanuel@nobody.com",
  },
];
