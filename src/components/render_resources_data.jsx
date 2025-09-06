import { useQuery, useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import { showToast } from "../utils/toast";

const RenderResourceData = ({
  resourceAPIFn,
  uniqueKey,
  params = {},
  dataKey,
  SkeletonComponent,
  RenderItem,
  getKey = (item) => item.id,
  mode = "pagination", // "pagination" | "infinite"
}) => {
  const [page, setPage] = useState(0);
  const loaderRef = useRef(null);

  // ----- PAGINATION MODE -----
  const paginationQuery = useQuery({
    queryKey: [uniqueKey, page, params],
    queryFn: async () => resourceAPIFn({ page, ...params }),
    placeholderData: keepPreviousData,
    enabled: mode === "pagination",
  });

  // ----- INFINITE MODE -----
  const infiniteQuery = useInfiniteQuery({
    queryKey: [uniqueKey, params],
    queryFn: async ({ pageParam = 0 }) => resourceAPIFn({ page: pageParam, ...params }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.hasMore ? allPages.length : undefined,
    enabled: mode === "infinite",
  });

  const query = mode === "pagination" ? paginationQuery : infiniteQuery;
  const { data, error, isFetching, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    query;

  // ----- Infinite Scroll Observer -----
  useEffect(() => {
  if (mode !== "infinite" || !hasNextPage || isLoading) return;

  let timeoutId;
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        // console.log("Observer triggered, fetching next page");
        fetchNextPage();
      }
    },
    { threshold: 0.1 }
  );

  if (loaderRef.current) {
    observer.observe(loaderRef.current);
    const rect = loaderRef.current.getBoundingClientRect();
    const isVisible = rect.top >= 0 && rect.top <= window.innerHeight;
    if (isVisible && hasNextPage && !isFetchingNextPage) {
    //   console.log("Loader is already visible, fetching next page");
      timeoutId = setTimeout(() => fetchNextPage(), 100); // Debounce by 100ms
    }
  }

  return () => {
    if (loaderRef.current) observer.unobserve(loaderRef.current);
    if (timeoutId) clearTimeout(timeoutId);
  };
}, [mode, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage]);


  // Handle loading state
  if (isLoading) return <SkeletonComponent />;

  // Handle error state
  if (error) {
    console.error("render resource query error:", error);
    showToast("Unable to get resources, please try again later.", "error");
  }

  // Handle API error response
  if (data && !data?.success) {
    if(data?.error?.message)showToast(data?.error?.message, "info");
    showToast(data.message, 'info');
    
  }

  const itemsRaw =
    mode === "pagination"
      ? data?.[dataKey] || []
      : data?.pages?.flatMap((page) => page?.[dataKey] || []) || [];

      const items = [...new Map(itemsRaw.map((item) => [item.ads_response_id, item])).values()];

    //   console.log("Items:", items);     
    //   console.log("Unique IDs:", [...new Set(items.map((item) => item.ads_response_id))]);

  const hasData = items.length > 0;
  //console.log(data)

  return (
    <section className="render-resources">
      <div className="card-holder">
        {items.map((item) => (
          <RenderItem key={getKey(item)} {...item} />
        ))}
      </div>

      {mode === "pagination" && hasData && (
        <div className="pagination-holder">
          <div className="btn-holder">
            <div className="btn-box">
              <Button
                type="button"
                onClick={() => setPage((old) => Math.max(old - 1, 0))}
                disabled={page === 0}
              >
                Previous
              </Button>
            </div>
            <div className="page">
              <p>{page + 1}</p>
            </div>
            <div className="btn-box">
              <Button
                onClick={() => setPage((old) => old + 1)}
                disabled={!data?.hasMore}
              >
                Next
              </Button>
            </div>
          </div>
          <div className="fetch-pg">
            {isFetching ? <span>Loading...</span> : null}
          </div>
        </div>
      )}

      {mode === "infinite" && (
        <div ref={loaderRef} className="infinite-loader">
          {isFetchingNextPage ? <span>Loading more...</span> : null}
          {!hasNextPage && hasData && <span>----No more results----</span>}
        </div>
      )}
    </section>
  );
};

export default RenderResourceData;
