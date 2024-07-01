import { Plugin } from "rollup";

interface AliasOpts {
  entries: {
    [key: string]: string;
  };
}

export default function alias(opts: AliasOpts): Plugin {
  const { entries } = opts;
  return {
    name: "alias",
    resolveId(source, importer, options) {
      const aliasWords = Object.keys(opts.entries);
      const matchAlias = aliasWords.find((alias) => source.startsWith(alias));
      if (matchAlias) return source.replace(matchAlias, entries[matchAlias]);
      else return source;
    },
  };
}
