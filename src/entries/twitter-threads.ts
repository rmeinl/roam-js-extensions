import { addButtonListener } from "../entry-helpers";
import {
  asyncType,
  pushBullets,
  getConfigFromPage,
  genericError,
} from "roam-client";

const TWITTER_REFERENCES_COMMAND = "twitter thread";

const twitterReferencesListener = async (
  _: any,
  blockUid: string,
  parentUid: string
) => {
  const config = getConfigFromPage("roam/js/twitter");
  const username = config["username"];
  if (!username) {
    await asyncType("Error: Missing required parameter username!");
    return;
  }
  const tweet_id = config["tweet_id"];
  if (!tweet_id) {
    await asyncType("Error: Missing required parameter tweet_id!");
    return;
  }

  const pageTitle = document.getElementsByClassName("rm-title-display")[0]
    .textContent;

  var request = new XMLHttpRequest()

  request.open('GET', 'http://127.0.0.1:8000/user/rmeinl/1314128307676499971', true)
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
      console.log(data);
      // pushBullets(data, blockUid, parentUid);
    } else {
      console.log('error')
    }
  }
  request.send();
};

addButtonListener(TWITTER_REFERENCES_COMMAND, twitterReferencesListener);
