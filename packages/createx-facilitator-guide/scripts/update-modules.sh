#!/bin/bash

# Script to apply the new architecture to all module pages
# This will create backup files and apply the withModuleProgress HOC

MODULES_DIR="/Users/shenyanbin/bx/createx-project/createx-project/packages/createx-facilitator-guide/app/(localized)/[lang]/modules"

# Array of all module directories
MODULES=(
    "creativity-fundamentals"
    "design-thinking-history" 
    "creative-confidence"
    "mission-principles"
    "createx-mission"
    "process-overview"
    "research-empathy"
    "sense-making"
    "framing-prioritization"
    "ideation-methods"
    "prototyping-methods"
    "testing-feedback"
    "implementation-roadmapping"
    "reflection-learning"
    "scoping-logistics"
    "agenda-design"
    "facilitation-skills"
    "facilitator-mindsets"
    "capturing-outcomes"
    "troubleshooting"
    "case-study-corporate"
    "case-study-nonprofit"
    "case-study-education"
    "analytics-kpis"
    "competency-certification"
    "personal-brand"
    "community-practice"
    "ai-integration"
)

echo "🚀 Starting module architecture update..."

for module in "${MODULES[@]}"; do
    MODULE_PATH="$MODULES_DIR/$module/page.tsx"
    
    if [ -f "$MODULE_PATH" ]; then
        echo "📝 Processing $module..."
        
        # Create backup
        cp "$MODULE_PATH" "$MODULE_PATH.backup"
        
        # The actual transformation will be done by Node.js script
        echo "✅ Backup created for $module"
    else
        echo "⚠️  Module file not found: $MODULE_PATH"
    fi
done

echo "🎉 Module architecture update completed!"
echo "📋 Next steps:"
echo "   1. Run the Node.js transformation script"
echo "   2. Test each module individually"
echo "   3. Verify localStorage functionality"
