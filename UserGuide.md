# Anonymous Posting Feature User Guide

## Overview
- You can now post topics and replies anonymously.
- Anonymous posts hide your identity in the UI, showing an "A" avatar and the name "Anonymous".
- Admins can still see the true author in the database and API responses.
- Anonymous posts are included in teasers and category lists, with content visible but identity hidden in the UI.

## How to Use

### 1. Enable the Anonymous Option in Composer

To use the anonymous posting feature, you must install the modified composer plugin from Deeptika's fork:

```bash
npm install github:deeptikam/nodebb-plugin-composer-default
```

After installing, rebuild and restart NodeBB:

```bash
./nodebb build
./nodebb restart
```

Once installed, when creating a new topic or replying, you will see a checkbox labeled "Post anonymously" in the composer (post editor).
Check this box before submitting your post to make it anonymous.

### 2. Submit an Anonymous Topic or Reply
- Fill in your post content as usual.
- Check the "Post anonymously" box.
- Click "Submit".

### 3. Viewing Anonymous Posts
- In topic and category lists, anonymous posts show an "A" avatar and the name "Anonymous".
- The post content is visible, but your username and profile are hidden from other users.
- Teasers (the preview snippet shown in topic lists and categories) will show the content of anonymous posts, but the author is displayed as "Anonymous".

### 4. Admin Visibility
- Admins can view the true author of any post via the database or API if needed.
- The anonymous flag is stored with each post and topic, and is visible in API responses.

## Demo Sequence
1. Go to any category and click "New Topic".
2. Enter your title and content.
3. Check the "Post anonymously" box.
4. Submit the topic.
5. Observe that your post appears with the "A" avatar and "Anonymous" name.
6. Reply to the topic with the anonymous box checked; your reply will also be anonymous.
7. In category and topic lists, teasers for topics with anonymous posts will show the anonymous avatar and content.

## Troubleshooting
- If you do not see the anonymous checkbox, make sure you have installed the modified composer plugin using the command above and rebuilt/restarted NodeBB.
- If your identity is not hidden, try a hard refresh or restart NodeBB to ensure the latest assets are loaded.
- If you are an admin and need to audit anonymous posts, use the API or database to view the true author.

## Feature Limitations
- Anonymous posts are not retroactive; you cannot make an existing post anonymous after submission.
- Anonymous posts are visible in teasers and lists, but only the UI hides the author; data is still present for admin use.

## Feedback
If you encounter issues or have suggestions, please contact the project maintainers or file an issue in the repository.
