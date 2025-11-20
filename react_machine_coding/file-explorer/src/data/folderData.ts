interface folderDataInterface {
  id: number;
  name: string;
  isFolder: boolean;
  items: folderDataInterface[] | [];
}

export const explorer: folderDataInterface = {
  id: 1,
  name: "root",
  isFolder: true,
  // items: [],
  items: [
    {
      id: 2,
      name: "public",
      isFolder: true,
      items: [
        {
          id: 3,
          name: "public nested 1",
          isFolder: true,
          items: [
            {
              id: 4,
              name: "index.html",
              isFolder: false,
              items: [],
            },
            {
              id: 5,
              name: "hello.html",
              isFolder: false,
              items: [],
            },
          ],
        },
        {
          id: 6,
          name: "public nested 2",
          isFolder: true,
          items: [],
        },
      ],
    },
    {
      id: 7,
      name: "src",
      isFolder: true,
      items: [
        {
          id: 8,
          name: "components",
          isFolder: true,
          items: [
            {
              id: 9,
              name: "Header.tsx",
              isFolder: false,
              items: [],
            },
          ],
        },
        {
          id: 10,
          name: "utils",
          isFolder: true,
          items: [],
        },
      ],
    },
  ],
};
