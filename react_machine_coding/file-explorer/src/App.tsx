import { useState } from "react";
import { explorer } from "./data/folderData";

interface folderDataInterface {
  id: number;
  name: string;
  isFolder: boolean;
  items: folderDataInterface[] | [];
}

const App = () => {
  return <ComponentTree />;
};

const ComponentTree = () => {
  const [rootData, setRootData] = useState(explorer);

  return <Component rootData={rootData} data={rootData} setRootData={setRootData} />;
};

const Component = ({
  data,
  rootData,
  setRootData,
}: {
  data: folderDataInterface;
  rootData: folderDataInterface;
  setRootData: React.Dispatch<React.SetStateAction<folderDataInterface>>;
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [creationType, setCreationType] = useState<"Folder" | "File">("File");
  const [input, setInput] = useState("");
  const [newName, setNewName] = useState(data.name);
  const isFolder = data.isFolder;

  const startCreating = (type: "Folder" | "File") => {
    setIsCreating(true);
    setCreationType(type);
    setIsEditing(false);
  };

  const startEditing = () => {
    setIsEditing(true);
    setIsCreating(false);
    setInput("");
  };

  const create = () => {
    if (input.length < 1) {
      alert("Length of the name should be more than 1");
      return;
    }

    const nameAlreadyExists = () => {
      return data?.items.some((item) => item.name === input);
    };

    if (nameAlreadyExists()) {
      alert("Can't have files or folders with same name inside one folder.");
      return;
    }

    const newItem = {
      id: new Date().getTime(),
      name: input,
      isFolder: creationType === "Folder",
      items: [],
    };

    const newItems = [...data.items, newItem];
    data.items = newItems;

    setIsCreating(false);
    setInput("");
  };

  const editConfirm = () => {
    const updatedTree = renameItemById(rootData, data.id);
    setRootData(updatedTree);

    setIsEditing(false);
  };

  const deleteItemById = (tree: folderDataInterface, id: number): folderDataInterface => {
    if (!tree.isFolder) return tree;

    console.log({ ...tree, items: tree.items.filter((item) => item.id !== id) });

    return {
      ...tree,
      items: tree.items
        .filter((item) => item.id !== id)
        .map((item) => (item.items.length > 0 ? deleteItemById(item, id) : { ...item })),
    };
  };

  const renameItemById = (tree: folderDataInterface, id: number): folderDataInterface => {
    if (!tree.isFolder) return tree;

    return {
      ...tree,
      items: tree.items
        .map((item) => (item.id === id ? { ...item, name: newName } : item))
        .map((item) => (item.items.length > 0 ? renameItemById(item, id) : { ...item })),
    };
  };

  return (
    <div className={`ml-5 ${isFolder && "mb-1"}`}>
      <div className="flex gap-0.5 items-center">
        <span>{data.isFolder ? "📁" : "📄"}</span>

        {isEditing ? (
          <div className="flex items-center gap-1">
            <input
              className="bg-gray-100 px-1 my-2"
              type="text"
              value={newName}
              autoFocus
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && editConfirm()}
            />
            <button onClick={editConfirm}>☑️</button>
          </div>
        ) : (
          <p className="text-lg">{data.name}</p>
        )}

        <div className="flex ml-1 gap-1">
          {isFolder && (
            <>
              <button
                onClick={() => startCreating("Folder")}
                className="bg-gray-300 px-1.5 cursor-pointer py-0.5 text-xs rounded-xs"
              >
                folder+
              </button>
              <button
                onClick={() => startCreating("File")}
                className="bg-gray-300 px-1.5 cursor-pointer py-0.5 text-xs rounded-xs"
              >
                file+
              </button>
            </>
          )}

          <button
            onClick={() => {
              const updatedTree = deleteItemById(rootData, data.id);
              setRootData(updatedTree);
            }}
            className="bg-red-300 px-1.5 cursor-pointer py-0.5 text-xs rounded-xs"
          >
            del-
          </button>
          <button
            onClick={startEditing}
            className="bg-gray-300 px-1.5 cursor-pointer py-0.5 text-xs rounded-xs"
          >
            ren↺
          </button>
        </div>
      </div>

      {isCreating && (
        <div className="flex ml-4 gap-0.5 items-center">
          <span>{creationType === "Folder" ? "📁" : "📄"}</span>

          <input
            className="bg-gray-100 px-1 my-2"
            type="text"
            value={input}
            autoFocus
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && create()}
          />
          <button onClick={create}>☑️</button>
          <button
            className="cursor-pointer"
            onClick={() => {
              setIsCreating(false);
              setInput("");
            }}
          >
            ❎
          </button>
        </div>
      )}

      {data.items &&
        data.items
          ?.sort((a, b) => {
            if (a.isFolder !== b.isFolder) {
              return Number(a.isFolder) - Number(b.isFolder); // folders first
            }
            return a.name.localeCompare(b.name); // then sort alphabetically by name
          })
          .map((comp) => (
            <Component
              key={comp.id}
              rootData={rootData}
              data={comp}
              setRootData={setRootData}
            />
          ))}
    </div>
  );
};

export default App;
