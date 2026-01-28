import React, { useState } from "react";
import Papa from "papaparse";

/* ============================
   TYPES
============================ */
type ParsedTable = {
  headers: string[];
  rows: Record<string, string | null>[];
};

/* ============================
   CSV PARSER
============================ */
function parseCSVFile(file: File): Promise<ParsedTable> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as Record<string, string>[];
        const headers = results.meta.fields ?? [];

        resolve({
          headers,
          rows: rows.map((r) =>
            Object.fromEntries(headers.map((h) => [h, r[h] ?? ""]))
          ),
        });
      },
      error: reject,
    });
  });
}

/* ============================
   MERGE LOGIC
============================ */
function mergeTables(
  left: ParsedTable,
  right: ParsedTable,
  leftKey: string,
  rightKey: string,
  joinType: "inner" | "left" | "right" | "outer"
): ParsedTable {
  const leftMap = new Map<string, any[]>();
  const rightMap = new Map<string, any[]>();

  left.rows.forEach((r) => {
    const key = r[leftKey] ?? "";
    if (!leftMap.has(key)) leftMap.set(key, []);
    leftMap.get(key)!.push(r);
  });

  right.rows.forEach((r) => {
    const key = r[rightKey] ?? "";
    if (!rightMap.has(key)) rightMap.set(key, []);
    rightMap.get(key)!.push(r);
  });

  const mergedHeaders = [...left.headers];
  right.headers.forEach((h) => {
    if (h !== rightKey) mergedHeaders.push(left.headers.includes(h) ? `${h}_r` : h);
  });

  const resultRows: any[] = [];
  const allKeys = new Set([...leftMap.keys(), ...rightMap.keys()]);

  function addRow(l?: any, r?: any) {
    const obj: any = {};
    left.headers.forEach((h) => (obj[h] = l ? l[h] : ""));
    right.headers.forEach((h) => {
      if (h === rightKey) return;
      obj[left.headers.includes(h) ? `${h}_r` : h] = r ? r[h] : "";
    });
    resultRows.push(obj);
  }

  allKeys.forEach((key) => {
    const L = leftMap.get(key);
    const R = rightMap.get(key);

    if (joinType === "inner") {
      if (L && R) L.forEach((l) => R.forEach((r) => addRow(l, r)));
    } else if (joinType === "left") {
      if (L && R) L.forEach((l) => R.forEach((r) => addRow(l, r)));
      else if (L) L.forEach((l) => addRow(l, undefined));
    } else if (joinType === "right") {
      if (L && R) L.forEach((l) => R.forEach((r) => addRow(l, r)));
      else if (R) R.forEach((r) => addRow(undefined, r));
    } else if (joinType === "outer") {
      if (L && R) L.forEach((l) => R.forEach((r) => addRow(l, r)));
      else if (L) L.forEach((l) => addRow(l, undefined));
      else if (R) R.forEach((r) => addRow(undefined, r));
    }
  });

  return { headers: mergedHeaders, rows: resultRows };
}

/* ============================
   COMPONENT
============================ */
export default function UploadMerge() {
  const [leftTable, setLeftTable] = useState<ParsedTable | null>(null);
  const [rightTable, setRightTable] = useState<ParsedTable | null>(null);

  const [leftKey, setLeftKey] = useState("");
  const [rightKey, setRightKey] = useState("");
  const [joinType, setJoinType] = useState("inner");

  const [merged, setMerged] = useState<ParsedTable | null>(null);

  /* ——— FILE HANDLERS ——— */
  const handleLeftFile = async (file?: File) => {
    if (file) {
      const parsed = await parseCSVFile(file);
      setLeftTable(parsed);
      setLeftKey(parsed.headers[0] ?? "");
    }
  };

  const handleRightFile = async (file?: File) => {
    if (file) {
      const parsed = await parseCSVFile(file);
      setRightTable(parsed);
      setRightKey(parsed.headers[0] ?? "");
    }
  };

  const handleMerge = () => {
    if (!leftTable || !rightTable) {
      alert("Upload both CSV files!");
      return;
    }
    setMerged(mergeTables(leftTable, rightTable, leftKey, rightKey, joinType as any));
  };

  /* ——— TABLE PREVIEW ——— */
  const TablePreview = ({ table }: { table: ParsedTable | null }) => {
    if (!table) return <p className="text-white/60">No data yet.</p>;

    return (
      <div className="overflow-auto border border-white/20 rounded">
        <table className="w-full text-sm text-white">
          <thead className="bg-white/10">
            <tr>
              {table.headers.map((h) => (
                <th key={h} className="px-2 py-1 border-r border-white/10">{h}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {table.rows.slice(0, 5).map((r, i) => (
              <tr key={i} className="bg-white/5">
                {table.headers.map((h) => (
                  <td key={h} className="px-2 py-1 border-r border-white/10">
                    {r[h]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  /* ——— DOWNLOAD CSV ——— */
  const downloadMerged = () => {
    if (!merged) return;
    const csv = Papa.unparse({
      fields: merged.headers,
      data: merged.rows.map((r) => merged.headers.map((h) => r[h] ?? "")),
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "merged_output.csv";
    a.click();
  };

  /* ============================
     PAGE UI
  ============================ */
  return (
    <div
      className="
        min-h-screen w-full p-10 text-white space-y-10
        bg-gradient-to-br 
        from-[#0a0528] 
        via-[#1b0c42] 
        to-[#3e1b6f]
        bg-fixed
      "
    >
      <h1 className="text-4xl font-bold">Upload & Merge CSV Data</h1>
      <p className="text-white/70">Upload two CSV files and merge them using join operations.</p>

      {/* FILE INPUTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="glass p-6 rounded-xl border border-white/20">
          <h3 className="font-semibold text-lg mb-2">Left File</h3>
          <input type="file" accept=".csv" onChange={(e) => handleLeftFile(e.target.files?.[0])} />
          <div className="mt-4">
            <p className="text-sm text-white/60">Preview:</p>
            <TablePreview table={leftTable} />
          </div>
        </div>

        <div className="glass p-6 rounded-xl border border-white/20">
          <h3 className="font-semibold text-lg mb-2">Right File</h3>
          <input type="file" accept=".csv" onChange={(e) => handleRightFile(e.target.files?.[0])} />
          <div className="mt-4">
            <p className="text-sm text-white/60">Preview:</p>
            <TablePreview table={rightTable} />
          </div>
        </div>
      </div>

      {/* MERGE CONTROLS */}
      <div className="glass p-6 rounded-xl border border-white/20 grid grid-cols-1 md:grid-cols-3 gap-6">

        <div>
          <label className="text-sm text-white">Left Join Key</label>
          <select
            className="w-full bg-white/10 text-white p-2 rounded mt-1"
            value={leftKey}
            onChange={(e) => setLeftKey(e.target.value)}
          >
            {leftTable?.headers.map((h) => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm text-white">Right Join Key</label>
          <select
            className="w-full bg-white/10 text-white p-2 rounded mt-1"
            value={rightKey}
            onChange={(e) => setRightKey(e.target.value)}
          >
            {rightTable?.headers.map((h) => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm text-white">Join Type</label>
          <select
            className="w-full bg-white/10 text-white p-2 rounded mt-1"
            value={joinType}
            onChange={(e) => setJoinType(e.target.value)}
          >
            <option value="inner">Inner Join</option>
            <option value="left">Left Join</option>
            <option value="right">Right Join</option>
            <option value="outer">Full Outer Join</option>
          </select>
        </div>

        <div className="md:col-span-3 text-right">
          <button
            onClick={handleMerge}
            className="px-5 py-2 bg-blue-600 rounded shadow text-white"
          >
            Merge Files
          </button>
        </div>
      </div>

      {/* MERGED OUTPUT */}
      <div className="glass p-6 rounded-xl border border-white/20 space-y-4">
        <h3 className="text-xl font-semibold">Merged Result</h3>

        {merged ? (
          <>
            <p className="text-white/70">
              Rows: {merged.rows.length} | Columns: {merged.headers.length}
            </p>

            <TablePreview table={merged} />

            <button
              onClick={downloadMerged}
              className="px-4 py-2 bg-green-600 text-white rounded shadow"
            >
              Download CSV
            </button>
          </>
        ) : (
          <p className="text-white/60">Run merge to view result.</p>
        )}
      </div>
    </div>
  );
}
