# Lorive (LOcal - dRIVE)
This is something like a NAS or Google Drive but in your LAN network. Everything goes throught HTTP, React and Go.
*I have created this project in ~21hours just for fun so it has some lacks.*

# GO
A single server file which creates the "ROOT_LORIVE" folder. Its not securiced so its vulnerable to Path Traversal attack.
To run it, just execute main.exe or build main.go nad execute it.

    Execute: main.exe
    or
    Build: go build main.go && main.exe
    
# React
Simple and maybe ugly interface but works fine.
You can:
  - Download files (one by one)
  - Rename files and folders
  - Delete files and folders
  - Upload multiple files (not folders)
Before run it, you need to install dependencies:

    npm install
     
And after that:

    Execute: npm run start
    or
    Build: npm run build
