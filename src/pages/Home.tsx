import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Col, Row, Spinner } from "react-bootstrap";
import { RootState, AppDispatch } from "../store";
import { fetchCountries, loadMore } from "../features/countriesSlice";
import Slider from "../shared/Slider";
import CountryCard from "../shared/CountryCard";
import Filters from "../shared/Filters";
import { SlSocialFacebook, SlSocialGoogle } from "react-icons/sl";
import { LuLinkedin, LuTwitter } from "react-icons/lu";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error, filterRegion, visibleCount } = useSelector(
    (s: RootState) => s.countries
  );

  useEffect(() => {
    if (status === "idle") dispatch(fetchCountries());
  }, [status, dispatch]);

  const filtered = useMemo(() => {
    if (filterRegion === "All") return items;
    return items.filter((c) => c.region === filterRegion);
  }, [items, filterRegion]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="p-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0 font-[900]">Countries</h4>
        <Filters />
      </div>
      <div className="flex items-center justify-center w-full pt-7 gap-3 mt-3">
        <div className="flex-grow border-t-3 border-black p-4"></div>
        <h2 className="text-center fw-bold mb-3 text-4xl">WELCOME</h2>
        <div className="flex-grow border-b-3   border-black mt-3"></div>
      </div>

      <Row className="g-3 mb-4">
        <Col xs={12} lg={9}>
          <Slider />
        </Col>
        <Col xs={12} lg={3}>
          <div className=" p-3 h-100 d-flex align-items-center justify-content-center text-muted border-3 border-black mt-3 ">
            Feature
          </div>
        </Col>
      </Row>

      {status === "loading" && (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" role="status" />
        </div>
      )}
      {status === "failed" && <Alert variant="danger">{error}</Alert>}

      {status === "succeeded" && (
        <>
          <Row className="g-3 mt-2">
            {visible.map((c) => (
              <Col key={c.name} xs={12} md={6}>
                <CountryCard name={c.name} flag={c.flag} region={c.region} />
              </Col>
            ))}
          </Row>

          <div className="d-flex justify-content-center mt-4">
            {visible.length < filtered.length ? (
              <Button
                className="!rounded-none bg-black !border-none"
                onClick={() => dispatch(loadMore())}
              >
                Load more
              </Button>
            ) : (
              <div className="text-muted">No more countries to load.</div>
            )}
          </div>
        </>
      )}

      <footer className="text-center text-muted small mt-5 pb-16">
        <div className="flex justify-center gap-3">
          <button className="rounded-circle border flex justify-center items-center bg-white p-2 social-btn hover:bg-black hover:text-white transition">
            <span className="fw-bold">
              <SlSocialGoogle />
            </span>
          </button>

          <button className="rounded-circle border flex justify-center items-center bg-white p-2 social-btn hover:bg-black hover:text-white transition">
            <span className="fw-bold">
              <SlSocialFacebook />
            </span>
          </button>

          <button className="rounded-circle border flex justify-center items-center bg-white p-2 social-btn hover:bg-black hover:text-white transition">
            <span className="fw-bold">
              <LuLinkedin />
            </span>
          </button>

          <button className="rounded-circle border flex justify-center items-center bg-white p-2 social-btn hover:bg-black hover:text-white transition">
            <span className="fw-bold">
              <LuTwitter />
            </span>
          </button>
        </div>
        <div className="mt-3">example@email.com</div>
        <div className="mt-7">Copyright © 2025 Name. All rights reserved.</div>
      </footer>
    </div>
  );
}
