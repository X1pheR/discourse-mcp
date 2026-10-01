#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
IMAGE="${DISCOURSE_IMAGE:-discourse-mcp:0.3.1-x1pher.1}"
docker build --tag "$IMAGE" "$ROOT"
docker run --rm --network none "$IMAGE" --version
docker image inspect "$IMAGE" --format '{{.Id}}'
