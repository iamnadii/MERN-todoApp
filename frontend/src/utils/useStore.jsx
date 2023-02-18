import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useStore = create((set, get) => ({
    inputValue: '',
    inputChecked: false,
    activeId: 1,
    listItems: [
        { id: 1, name: 'All' },
        { id: 2, name: 'Active' },
        { id: 3, name: 'Completed' },
    ],
    inputValueSetter: (value) => {
        set(() => ({ inputValue: value }));
    },
    inputCheckedSetter: (value) => {
        set(() => ({ inputChecked: value }));
    },
    activeIdSetter: (value) => {
        set(() => ({ activeId: value }));
    },
}));

export const usePersistData = create(
    persist(
        (set, get) => ({
            isDarkMode: false,
            todoList: [
                { id: 1, label: 'todo-list-1', checked: true },
                { id: 2, label: 'todo-list-1', checked: false },
                { id: 3, label: 'todo-list-1', checked: false },
            ],
            darkModeSetter: () => {
                set((state) => ({ isDarkMode: !state.isDarkMode }));
            },
            todoListSetter: (value) => {
                set(() => ({ todoList: value }));
            },
        }),
        {
            name: 'list-Data',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
