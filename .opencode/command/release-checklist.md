---
description: Run the full release checklist before publishing a new version
agent: validation-director
---

# /release-checklist — Release Quality Gate

Invoke **validation-director** → **qa-lead**.

## Pre-Release Checklist

### Code Quality
- [ ] All tests passing (using whatever test runner the project's chosen
      stack uses)
- [ ] Coverage thresholds met for all modules
- [ ] No open CRITICAL bugs in issue tracker
- [ ] Code review completed for all PRs in this release
- [ ] No `TODO:` or `FIXME:` in production code (moved to issues)

### Validation Status
- [ ] All new process models have at least Level 1 validation (limiting cases)
- [ ] Validation report updated for this version
- [ ] Mass balance closure verified on all standard scenarios
- [ ] No regression failures vs. previous version

### Documentation
- [ ] CHANGELOG.md updated with all changes
- [ ] User manual reflects new features
- [ ] API docs regenerated
- [ ] Any breaking changes documented in UPGRADING.md

### Release
- [ ] Version bumped in whatever the project's actual version-tracking
      file is (depends on chosen stack — e.g., `pyproject.toml` for Python,
      `package.json` for Node, etc.)
- [ ] Git tag created: `v[major].[minor].[patch]`
- [ ] Release notes written

Output: RELEASE READY / BLOCKED with all open items listed.
