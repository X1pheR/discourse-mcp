#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
VERIFY_IMAGE="${DISCOURSE_VERIFY_IMAGE:-discourse-mcp-verify:0.3.1-x1pher.1}"
IMAGE="${DISCOURSE_IMAGE:-discourse-mcp:0.3.1-x1pher.1}"
docker build -f "$ROOT/Dockerfile.verify" -t "$VERIFY_IMAGE" "$ROOT"
docker run --rm --network none --memory 1g --cpus 1 --label eu.hypershell.cleanup=discourse-verify "$VERIFY_IMAGE"
DISCOURSE_IMAGE="$IMAGE" "$ROOT/scripts/build.sh"
for test in downstream-surface http-smoke; do
  docker run --rm --network none --read-only --tmpfs /tmp --memory 256m --cpus 0.5 \
    --label eu.hypershell.cleanup=discourse-package-verify \
    --mount "type=bind,src=$ROOT/scripts/$test.mjs,dst=/opt/discourse-mcp/scripts/$test.mjs,readonly" \
    --workdir /opt/discourse-mcp --entrypoint node "$IMAGE" "scripts/$test.mjs"
done
