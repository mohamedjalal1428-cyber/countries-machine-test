import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { resetList, setRegion } from "../features/countriesSlice";
import { BiMenu, BiX } from "react-icons/bi";

export default function Filters() {
  const dispatch = useDispatch();
  const { items, filterRegion } = useSelector((s: RootState) => s.countries);

  const [open, setOpen] = useState(false);

  const regions = useMemo<string[]>(() => {
    const set = new Set<string>(items.map((c) => c.region).filter(Boolean));
    return ["All", ...Array.from(set).sort()];
  }, [items]);

  const onSelect = (region: string) => {
    dispatch(setRegion(region));
    dispatch(resetList());
    setOpen(false);
  };

  return (
    <div className="relative">
      <div className="hidden sm:flex gap-6">
        {regions.map((r) => {
          const isActive = r === filterRegion;
          return (
            <button
              key={r}
              onClick={() => onSelect(r)}
              className={`relative pb-1 text-gray-500 hover:text-black transition ${
                isActive ? "font-semibold text-black" : ""
              }`}
            >
              {r}
              {isActive && (
                <span className="absolute left-0 right-0 -bottom-0.5 mx-auto h-0.5 w-6 bg-black rounded" />
              )}
            </button>
          );
        })}
      </div>

      <div className="sm:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 border rounded-md"
        >
          {open ? <BiX size={20} /> : <BiMenu size={20} />}
        </button>

        {open && (
          <div className="absolute mt-2 right-0 w-40 bg-white border rounded-md shadow-md z-10">
            <div className="max-h-48 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {regions.map((r) => {
                const isActive = r === filterRegion;
                return (
                  <button
                    key={r}
                    onClick={() => onSelect(r)}
                    className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${
                      isActive ? "font-semibold text-black" : "text-gray-500"
                    }`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
