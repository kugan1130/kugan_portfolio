# AGENTS.md — Persistent Project Instructions

## CRITICAL — DO NOT DELETE USER DATA

This project contains permanent user-owned portfolio assets.

The following directories/files are USER DATA and MUST NEVER be deleted, replaced, renamed, moved, emptied, regenerated, or overwritten unless explicitly requested by the user:

```text
public/storage/certificates/
public/storage/projects/
public/storage/resume/
public/storage/media/
```

This includes:
- Uploaded certificates (images, PDFs)
- Project screenshots and videos
- Architecture diagrams and case study assets
- Resume files and documents
- Portfolio media and user-uploaded data records

## STRICT DATA-PRESERVATION RULES

1. **NEVER** delete existing uploaded files or asset records.
2. **NEVER** replace an uploaded certificate or video with a generated placeholder.
3. **NEVER** remove an asset because it appears unused.
4. **NEVER** rename or move an asset directory/file unless explicitly instructed.
5. **NEVER** run commands or scripts that clear asset directories.
6. **NEVER** TRUNCATE or wipe IndexedDB/LocalStorage data automatically on app updates.
7. **Preserve all existing asset URLs and data records.** If an asset reference is broken, repair the reference instead of deleting the record.
8. **Append new assets** without modifying or overwriting existing ones.
9. **Treat all future UI/feature updates as CODE-ONLY changes.** User-uploaded files and records must survive every code modification.
