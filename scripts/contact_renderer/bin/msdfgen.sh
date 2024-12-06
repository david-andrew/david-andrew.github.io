#!/bin/bash

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Call wine with the msdfgen.exe using the correct path and pass along all arguments
wine "$SCRIPT_DIR/msdfgen.exe" "$@"


# #!/bin/bash
# wine ./bin/msdfgen.exe "$@"