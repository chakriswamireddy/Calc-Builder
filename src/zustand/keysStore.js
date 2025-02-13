import { create } from "zustand";

const STORAGE_KEY = "calculatorLayout";

const getLocalStoredKeys = () => {
  try {
    const storedKeys = localStorage.getItem(STORAGE_KEY);
    return storedKeys ? JSON.parse(storedKeys) : null;
  } catch (err) {
    console.log("error fetching locatstorage", err);
    return null;
  }
};

const CONTAINER_KEY = "containerLayout";
const getLocalStoredContainerLayout = () => {
  try {
    const storedVals = localStorage.getItem(CONTAINER_KEY);
    return storedVals ? JSON.parse(storedVals) : null;
  } catch (err) {
    console.log("error fetching locatstorage", err);
    return null;
  }
};

const keysStore = create((set, get) => ({
  saveToLocalStorage: () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(get().allKeys));
  },

  allKeys: 
    [
    { "id": "0", "content": "Result", "label": "Result", "width": 0.9355, "height": 2.7239, "position": {x: 412.45, y: 39}, "selected": true },
    { "id": "1", "content": "7", "label": "7","width": 0.5709, "height": 0.6445,  "position": { "x": 30, "y": 30 }, "selected": true },
    { "id": "2", "content": "8", "label": "8", "width": 0.5765, "height": 0.6408, "position": { "x": 100, "y": 30 }, "selected": true },
    { "id": "3", "content": "9", "label": "9",  "width": 0.6244, "height": 0.6388,  "position": { "x": 170, "y": 30 }, "selected": true },
    { "id": "4", "content": "/", "label": "/",  "width": 0.5709, "height": 0.6548,  "position": { "x": 240, "y": 103 }, "selected": true },
    { "id": "5", "content": "4", "label": "4", "width": 0.6024, "height": 0.6983, "position": { "x": 30, "y": 100 }, "selected": true },
    { "id": "6", "content": "5", "label": "5", "width": 0.5684, "height": 0.7071, "position": { "x": 100, "y": 100 }, "selected": true },
    { "id": "7", "content": "6", "label": "6",  "width": 0.6240, "height": 0.6570, "position": { "x": 160, "y": 101 }, "selected": true },
    { "id": "8", "content": "*", "label": "*",  "width": 0.5971, "height": 0.6820, "position": { "x": 239, "y": 173 }, "selected": true },
    { "id": "9", "content": "1", "label": "1", "width": 0.6089, "height": 0.6591, "position": { "x": 30, "y": 174 }, "selected": true },
    { "id": "10", "content": "2", "label": "2", "width": 0.5568, "height": 0.6864, "position": { "x": 101, "y": 174 }, "selected": true },
    { "id": "11", "content": "3", "label": "3", "width": 0.6477, "height": 0.6808,  "position": { "x": 167, "y": 170 }, "selected": true },
    { "id": "12", "content": "-", "label": "-", "width": 1.0149, "height": 0.7206, "position": { "x": 305, "y": 171 }, "selected": true },
    { "id": "13", "content": "0", "label": "0", "width": 1.3341, "height": 0.6382, "position": { "x": 31, "y": 246 }, "selected": true },
    { "id": "14", "content": ".", "label": ".", "width": 0.4779, "height": 0.6321, "position": { "x": 174, "y": 245 }, "selected": true },
    { "id": "15", "content": "=", "label": "=", "width": 1.8171, "height": 0.6216, "position": { "x": 226, "y": 249 }, "selected": true },
    { "id": "16", "content": "+", "label": "+",  "width": 0.5989, "height": 0.7050, "position": { "x": 241, "y": 20 }, "selected": true },
    { "id": "17", "content": "⌫", "label": "⌫", "width": 1.0526, "height": 0.6472, "position": { "x": 305, "y": 102 }, "selected": true },
    { "id": "18", "content": "🗑️", "label": "🗑️",  "width": 1.0289, "height": 0.6349, "position": { "x": 306, "y": 30.5 }, "selected": true }
   
]
,

  // selectedKeys: (state) => state.allKeys.filter((item) => item.selected),
  // notSelectedKeys: (state) => state.allKeys.filter((item) => !item.selected),

  updateKeyPosition: (id, x, y) => {
    set(
      (state) => {
        const updatedKeys = state.allKeys.map((item) =>
          item.id === id ? { ...item, position: { x, y } } : item
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedKeys));
        console.log(updatedKeys)
        return { allKeys: updatedKeys };
      }
     
    );
  },

  updateKeySize: (id, w, h) => {
    set(
      (state) => {
        const updatedKeys = state.allKeys.map((item) =>
          item.id === id ? { ...item, width: w, height: h } : item
        );

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedKeys));
        return { allKeys: updatedKeys };
      }

      //     ({
      //     allKeys: state.allKeys.map((item) =>
      //         item.id === id ? { ...item,  width:w, height: h } : item
      //     ),
      // })
    );
  },

  changeKeySelect: (id, isSelected) => {
    set((state) => {
      // console.log(state.allKeys)
      return {
        allKeys: state.allKeys.map((item) =>
          item.id === id ? { ...item, selected: isSelected } : item
        ),
      };
    });
  },

  changeResultString: (str) => {
    set((state) => {
      return {
        allKeys: state.allKeys.map((item) =>
          item.id == 0 ? { ...item, content: str } : item
        ),
      };
    });
  },



  calcStr: "",
  updateCalcStr: (str) => set((state) => ({ calcStr: str })),

  errCalc: "",
  updateErrCalc: (str) => set((state) => ({ errCalc: str })),

  containerLayout: getLocalStoredContainerLayout() || {
    height: 400,
    width: 550,
  },


  updateContainerLayout: (newObj) => {
    set(() => {
        localStorage.setItem(CONTAINER_KEY, JSON.stringify(newObj));
        return { containerLayout: newObj };
      }
    );
  },








}));

export default keysStore;
