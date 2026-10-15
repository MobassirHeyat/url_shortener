import { useState } from "react";
import {
  Link2,
  Copy,
  Check,
  Trash2,
  BarChart3,
  Link,
  MousePointerClick,
  ExternalLink,
  Search,
} from "lucide-react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([
    {
      id: 1,
      originalUrl: "https://github.com/mobassir",
      shortUrl: "short.ly/a7K2",
      clicks: 124,
      createdAt: "Today",
    },
    {
      id: 2,
      originalUrl: "https://youtube.com",
      shortUrl: "short.ly/b91X",
      clicks: 87,
      createdAt: "Yesterday",
    },
    {
      id: 3,
      originalUrl: "https://google.com",
      shortUrl: "short.ly/k82P",
      clicks: 43,
      createdAt: "2 days ago",
    },
  ]);

  const [copied, setCopied] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // Shorten URL
  const handleShorten = (e) => {
    e.preventDefault();

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    try {
      new URL(url);
    } catch {
      setError("Please enter a valid URL");
      return;
    }

    const newLink = {
      id: Date.now(),
      originalUrl: url,
      shortUrl: `short.ly/${Math.random()
        .toString(36)
        .substring(2, 8)}`,
      clicks: 0,
      createdAt: "Just now",
    };

    setLinks((prev) => [newLink, ...prev]);
    setUrl("");
    setError("");
  };

  // Copy URL
  const handleCopy = async (shortUrl, id) => {
    await navigator.clipboard.writeText(`http://localhost:3000/${shortUrl}`);

    setCopied(id);

    setTimeout(() => {
      setCopied(null);
    }, 1500);
  };

  // Delete URL
  const handleDelete = (id) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  // Search
  const filteredLinks = links.filter((link) =>
    link.originalUrl.toLowerCase().includes(search.toLowerCase())
  );

  const totalClicks = links.reduce(
    (total, link) => total + link.clicks,
    0
  );

  //api call with axios
  const submitHanlder = async(e) => {
    e.preventDefault();
    if(!url) {
      setError("please enter a url");
      return ;
    }
    try {
      new URL(url)
    } catch {
      setError("please enter a valid url");
      return ;
    }
    console.log(url);
    const response = await axios.post("http://localhost:3000/api/shorten", {
      method : "POST",
      headers : {
        "content-type": "application-json",
      },
      data: {url}
    })
    let res = response.data;
    let payload = {
      shortUrl: res.shortCode,
      originalUrl: res.originalUrl,
      createdAt: res.createdAt,
      clicks: res.clicks,
      id: Date.now()
    }
    setLinks(prev => ([...prev, payload ] ))
    console.log(res.shortCode, res.originalUrl);
    setUrl("");
    setError("");
  }
  console.log(links.shortUrl);
  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-white p-2 text-black">
              <Link2 size={20} />
            </div>

            <span className="text-xl font-bold">
              Shortly
            </span>
          </div>

          <div className="hidden gap-8 text-sm text-zinc-400 md:flex">
            <a
              href="#dashboard"
              className="text-white"
            >
              Dashboard
            </a>

            <a
              href="#analytics"
              className="hover:text-white"
            >
              Analytics
            </a>

            <a
              href="#links"
              className="hover:text-white"
            >
              Links
            </a>
          </div>

          <button className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800">
            Sign In
          </button>
        </div>
      </nav>

      {/* Main */}
      <main
        id="dashboard"
        className="mx-auto max-w-6xl px-6 py-12"
      >

        {/* Hero */}
        <section className="mx-auto max-w-3xl text-center">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-400">
            <Link2 size={16} />
            Simple URL Shortener
          </div>

          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Make your links
            <span className="block text-zinc-400">
              short & shareable.
            </span>
          </h1>

          <p className="mt-5 text-zinc-400">
            Create short, memorable links and track
            how people interact with them.
          </p>

          {/* URL Form */}
          <form
            onSubmit={submitHanlder}
            className="mt-8"
          >
            <div className="flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-2 sm:flex-row">

              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/your-long-url"
                className="flex-1 bg-transparent px-4 py-3 outline-none placeholder:text-zinc-600"
              />

              <button
                type="submit"
                className="rounded-lg bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200"
              >
                Shorten URL
              </button>

            </div>

            {error && (
              <p className="mt-2 text-left text-sm text-red-400">
                {error}
              </p>
            )}
          </form>
        </section>

        {/* Stats */}
        <section
          id="analytics"
          className="mt-16 grid gap-4 sm:grid-cols-3"
        >

          <StatsCard
            icon={<Link size={20} />}
            title="Total Links"
            value={links.length}
          />

          <StatsCard
            icon={<MousePointerClick size={20} />}
            title="Total Clicks"
            value={totalClicks}
          />

          <StatsCard
            icon={<BarChart3 size={20} />}
            title="Average Clicks"
            value={
              links.length
                ? Math.round(totalClicks / links.length)
                : 0
            }
          />

        </section>

        {/* Links */}
        <section
          id="links"
          className="mt-12"
        >

          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <h2 className="text-2xl font-semibold">
                Your Links
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Manage your shortened URLs
              </p>
            </div>

            {/* Search */}
            <div className="flex items-center rounded-lg border border-zinc-800 bg-zinc-900 px-3">
              <Search
                size={18}
                className="text-zinc-500"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search links..."
                className="w-full bg-transparent px-2 py-2 text-sm outline-none placeholder:text-zinc-600"
              />
            </div>

          </div>

          {/* Link cards */}
          <div className="space-y-3">

            {filteredLinks.length === 0 && (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-500">
                No links found.
              </div>
            )}

            {filteredLinks.map((link) => (
              <LinkCard
                key={link.id}
                link={link}
                copied={copied === link.id}
                onCopy={handleCopy}
                onDelete={handleDelete}
              />
            ))}

          </div>

        </section>

      </main>
    </div>
  );
}


/* ---------------- Stats Card ---------------- */

function StatsCard({ icon, title, value }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">

      <div className="flex items-center justify-between">

        <div className="rounded-lg border border-zinc-800 p-2 text-zinc-400">
          {icon}
        </div>

        <span className="text-xs text-zinc-500">
          All time
        </span>

      </div>

      <p className="mt-5 text-sm text-zinc-500">
        {title}
      </p>

      <p className="mt-1 text-3xl font-bold">
        {value}
      </p>

    </div>
  );
}


/* ---------------- Link Card ---------------- */

function LinkCard({
  link,
  copied,
  onCopy,
  onDelete,
}) {
  return (
    <div className="group rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-700">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        {/* URL information */}
        <div className="min-w-0">

          <div className="flex items-center gap-2">

            <Link2
              size={18}
              className="shrink-0 text-zinc-500"
            />

            <span className="font-medium text-white">
              {link.shortUrl}
            </span>

          </div>

          <p className="mt-2 truncate text-sm text-zinc-500">
            {link.originalUrl}
          </p>

          <p className="mt-2 text-xs text-zinc-600">
            Created {link.createdAt}
          </p>

        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">

          <div className="mr-3 text-right">
            <p className="text-lg font-semibold">
              {link.clicks}
            </p>

            <p className="text-xs text-zinc-500">
              clicks
            </p>
          </div>

          {/* Open */}
          <a
            href={`https://${link.shortUrl}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-zinc-700 p-2.5 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            <ExternalLink size={18} />
          </a>

          {/* Copy */}
          <button
            onClick={() =>
              onCopy(link.shortUrl, link.id)
            }
            className="rounded-lg border border-zinc-700 p-2.5 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            {copied ? (
              <Check size={18} />
            ) : (
              <Copy size={18} />
            )}
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(link.id)}
            className="rounded-lg border border-zinc-700 p-2.5 text-zinc-400 transition hover:bg-zinc-800 hover:text-red-400"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}

export default App;