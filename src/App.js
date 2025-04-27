import { useState } from "react";
import "./styles.css";

const checkboxData = [
  {
    id: 1,
    name: "Fruits",
    children: [
      {
        id: 2,
        name: "Citrus",
        children: [
          { id: 3, name: "Orange", children: [] },
          { id: 4, name: "Lemon", children: [] },
        ],
      },
      {
        id: 5,
        name: "Berries",
        children: [
          { id: 6, name: "Strawberry", children: [] },
          { id: 7, name: "Blueberry", children: [] },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Vegetables",
    children: [
      {
        id: 9,
        name: "Leafy Greens",
        children: [
          { id: 10, name: "Spinach", children: [] },
          { id: 11, name: "Lettuce", children: [] },
        ],
      },
      {
        id: 12,
        name: "Roots",
        children: [
          { id: 13, name: "Carrot", children: [] },
          { id: 14, name: "Beetroot", children: [] },
        ],
      },
    ],
  },
  {
    id: 15,
    name: "Grains",
    children: [
      { id: 16, name: "wheat", children: [] },
      { id: 17, name: "Rice", children: [] },
    ],
  },
];

const CheckBoxes = ({ data, checked, setChecked }) => {
  const handleCheckEvent = (isChecked, node) => {
    setChecked((prev) => {
      const newChecked = { ...prev, [node.id]: isChecked };

      // if children are present, then check them all(add them to checked state)
      const updateChildren = (node) => {
        if (node.children.length > 0) {
          node.children?.forEach((child) => {
            newChecked[child.id] = isChecked;
            {
              child?.children.length > 0 && updateChildren(child);
            }
          });
        }
      };
      updateChildren(node);

      // if all children are checked then mark the parent as checked
      const verifyAllChildrenChecked = (node) => {
        if (node.children.length <= 0) return newChecked[node.id] || false;

        const isChildrenChecked = node.children?.every((child) => {
          return verifyAllChildrenChecked(child);
        });

        newChecked[node.id] = isChildrenChecked;
        return isChildrenChecked;
      };

      checkboxData.forEach((node) => verifyAllChildrenChecked(node));

      return newChecked;
    });
  };
  console.log(checked);
  return (
    <div className="container">
      {data.map((node) => (
        <div key={node.id} className="element">
          <input
            type="checkbox"
            checked={checked[node.id] || false}
            onChange={(e) => handleCheckEvent(e.target.checked, node)}
          />
          <span>{node.name}</span>
          {node.children.length > 0 && (
            <CheckBoxes
              data={node.children}
              checked={checked}
              setChecked={setChecked}
            />
          )}
        </div>
      ))}
    </div>
  );
};
export default function App() {
  const [checked, setChecked] = useState({});
  return (
    <div className="App">
      <CheckBoxes
        data={checkboxData}
        checked={checked}
        setChecked={setChecked}
      />
    </div>
  );
}
