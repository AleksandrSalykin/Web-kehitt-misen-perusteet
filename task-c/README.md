# task-c
This folder contains `index.html` for the task-c example (ready to be pushed into a Git repository).

## Files
- index.html — example HTML file.

## How to create a GitHub repo and get RAW link (step-by-step)
1. Create a new repository on GitHub (for example: `my-repo`).
2. Locally, initialize and push the `task-c` folder:
   ```bash
   cd path/to/where/you/want
   git init
   mkdir task-c
   cp /path/to/index.html task-c/index.html   # or move file into task-c
   git add task-c/index.html
   git commit -m "Add index.html in task-c"
   git branch -M main
   git remote add origin https://github.com/<your-username>/my-repo.git
   git push -u origin main
   ```
3. Ensure `index.html` is inside the `task-c` directory in the repository root.
4. The RAW link format on GitHub is:
   `https://raw.githubusercontent.com/<your-username>/<repo-name>/<branch>/task-c/index.html`
   Example (replace with your values):
   `https://raw.githubusercontent.com/alice/my-repo/main/task-c/index.html`

## Notes
- If you use GitHub web UI to upload, create a folder named `task-c` and upload `index.html` into it.
- If you host on another Git provider (GitLab, Bitbucket), they have similar raw URL patterns.
