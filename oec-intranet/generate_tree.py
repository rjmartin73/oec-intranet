import os


def build_tree_markdown(root_dir=".", prefix=""):
    tree = ""
    try:
        items = sorted(os.listdir(root_dir))
    except PermissionError:
        return ""
    items = [i for i in items if i not in ("__pycache__", ".DS_Store", ".venv", "venv", "node_modules")]
    for index, name in enumerate(items):
        path = os.path.join(root_dir, name)
        connector = "├── " if index < len(items) - 1 else "└── "
        tree += f"{prefix}{connector}{name}\n"
        if os.path.isdir(path):
            extension = "│   " if index < len(items) - 1 else "    "
            tree += build_tree_markdown(path, prefix + extension)
    return tree


if __name__ == "__main__":
    tree_output = build_tree_markdown()
    print("```\n" + tree_output + "```")
