--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 10.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: enum_furnishclass_name; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_furnishclass_name AS ENUM (
    'TABLE',
    'TREE',
    'RESTROON',
    'DOOR',
    'BAR',
    'EMPTY_TABLE',
    'KITCHEN',
    'RESTROOM'
);


ALTER TYPE public.enum_furnishclass_name OWNER TO admin;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: booking; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.booking (
    bookingid character varying(255) NOT NULL,
    ordertime timestamp with time zone NOT NULL,
    deliverytime timestamp with time zone,
    volume integer NOT NULL,
    issend integer DEFAULT 0 NOT NULL,
    customerid character varying(255) NOT NULL,
    itemid character varying(255) NOT NULL
);


ALTER TABLE public.booking OWNER TO postgres;

--
-- Name: customer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customer (
    customerid character varying(255) NOT NULL,
    checkintime timestamp with time zone NOT NULL,
    checkouttime timestamp with time zone,
    name character varying(255),
    peoplecount integer,
    phone character varying(255),
    remark character varying(255),
    furnish character varying(255)
);


ALTER TABLE public.customer OWNER TO postgres;

--
-- Name: furnish; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.furnish (
    furnishid character varying(255) NOT NULL,
    name character varying(255),
    x integer NOT NULL,
    y integer NOT NULL,
    furnishclass character varying(255) NOT NULL,
    mapid character varying(255) NOT NULL
);


ALTER TABLE public.furnish OWNER TO postgres;

--
-- Name: furnishclass; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.furnishclass (
    classid character varying(255) NOT NULL,
    name public.enum_furnishclass_name NOT NULL,
    imagepath character varying(255),
    visible character varying(1) DEFAULT 'T'::character varying NOT NULL,
    nameable character varying(1) DEFAULT 'T'::character varying NOT NULL
);


ALTER TABLE public.furnishclass OWNER TO postgres;

--
-- Name: item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.item (
    itemid character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    imagepath character varying(255),
    price integer NOT NULL,
    description character varying(255),
    isdisplay integer DEFAULT 1,
    classid character varying(255) NOT NULL
);


ALTER TABLE public.item OWNER TO postgres;

--
-- Name: itemclass; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.itemclass (
    classid character varying(255) NOT NULL,
    classname character varying(255) NOT NULL,
    imagepath character varying(255),
    description character varying(255),
    mealtype character varying(255) NOT NULL
);


ALTER TABLE public.itemclass OWNER TO postgres;

--
-- Name: seatmap; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.seatmap (
    mapid character varying(255) NOT NULL,
    name character varying(255),
    width integer NOT NULL,
    height integer NOT NULL
);


ALTER TABLE public.seatmap OWNER TO postgres;

--
-- Name: userinfo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.userinfo (
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.userinfo OWNER TO postgres;

--
-- Name: userrole; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.userrole (
    username character varying(255) NOT NULL,
    role character varying(255) NOT NULL
);


ALTER TABLE public.userrole OWNER TO postgres;

--
-- Data for Name: booking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.booking (bookingid, ordertime, deliverytime, volume, issend, customerid, itemid) FROM stdin;
2aaf3330-7667-4226-9f2c-47bddc8f7332	2018-02-07 04:02:52.083+00	2018-02-07 05:42:46.442+00	2	1	71c41949-9cb7-49e9-bc00-26629c91da9b	49d643bb-c7d6-4f00-b49f-ceae68971e40
\.


--
-- Data for Name: customer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customer (customerid, checkintime, checkouttime, name, peoplecount, phone, remark, furnish) FROM stdin;
165d1a58-f7b3-4baa-9d9b-689f271823bd	2017-07-28 15:06:52+00	2017-07-28 16:06:52+00	LIN	12	0911491788	\N	0402028d-04f6-4bab-a0f7-20b626dffa88
fa64f616-4a09-4eb7-b976-43856dd1d462	2017-07-28 15:06:52+00	\N	LIN	12	0911491788	\N	0402028d-04f6-4bab-a0f7-20b626dffa88
69e30389-2cfc-410d-a516-4dba6b840f99	2017-10-03 11:27:47+00	\N	Abner	19	0911491788	\N	c30e52a0-639c-4e41-9b60-d10e8bd4f5fd
71c41949-9cb7-49e9-bc00-26629c91da9b	2018-02-07 03:24:25.461+00	\N	abnerlin	1	0911491788	\N	08e9fc0d-e966-442a-9992-3c288aa55c8a
be88b22b-7ae7-410a-87b1-e2ad76e27793	2017-07-28 15:08:52+00	2018-01-26 09:30:39.497+00	Lu	10	0987654321	\N	\N
\.


--
-- Data for Name: furnish; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.furnish (furnishid, name, x, y, furnishclass, mapid) FROM stdin;
0402028d-04f6-4bab-a0f7-20b626dffa88	A2	212	129	48a7d493-dc80-4318-b180-ed51f16f120c	4cd7c00c-cf6e-4cdc-afbb-c3b1c8b013b3
08e9fc0d-e966-442a-9992-3c288aa55c8a	A4	216	232	48a7d493-dc80-4318-b180-ed51f16f120c	4cd7c00c-cf6e-4cdc-afbb-c3b1c8b013b3
c30e52a0-639c-4e41-9b60-d10e8bd4f5fd	A3	27	236	48a7d493-dc80-4318-b180-ed51f16f120c	4cd7c00c-cf6e-4cdc-afbb-c3b1c8b013b3
8b30fb75-d73e-4af5-bf72-99d5662d5f2b	A1	27	130	48a7d493-dc80-4318-b180-ed51f16f120c	4cd7c00c-cf6e-4cdc-afbb-c3b1c8b013b3
\.


--
-- Data for Name: furnishclass; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.furnishclass (classid, name, imagepath, visible, nameable) FROM stdin;
f8888e43-fe4b-4751-a1cd-3e9110a074a2	TREE	tree.png	T	F
48a7d493-dc80-4318-b180-ed51f16f120c	TABLE	table-sm.png	T	T
99ed91e4-5b37-44dc-a0d1-65cbdb04b568	EMPTY_TABLE	empty-table-sm.png	F	T
c8fd2c9b-7ef9-4656-9642-f49c46db0fc0	DOOR	door.png	T	F
6dbb2f95-077e-41ca-b8f4-f27ef309304f	BAR	bar.png	T	F
98a689f2-1afa-462f-93ad-93d5644ce311	RESTROOM	restroom.png	T	F
\.


--
-- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.item (itemid, name, imagepath, price, description, isdisplay, classid) FROM stdin;
49d643bb-c7d6-4f00-b49f-ceae68971e40	牛肉	meat-class.jpg	100	Beef desc	1	9ed2071e-93b1-42bb-8687-3ccdc87decb8
d4512dba-4582-4ec2-b4ac-581e3ac1e0a8	豬肉	meat-class.jpg	90	Pork desc	1	9ed2071e-93b1-42bb-8687-3ccdc87decb8
00d8d906-6e15-49b6-971a-ee1d24a1b679	青江菜	meat-class.jpg	35	Vegetable desc	1	2e3bcd58-8800-4c63-b1d1-b3e7649c19cb
5d551385-944c-4905-8e20-0fc83e24b32e	高麗菜	meat-class.jpg	35	VegetableII desc	1	2e3bcd58-8800-4c63-b1d1-b3e7649c19cb
2654c0ba-c420-4ae4-8cc6-0fce7312312e	貢丸	meat-class.jpg	20	AA desc	1	01965936-0347-44a8-bf74-5e62b4fb9b3e
2b2a29dd-c2c9-4299-ba8a-c758d286e74b	米血	meat-class.jpg	20	BB desc	1	01965936-0347-44a8-bf74-5e62b4fb9b3e
868380df-c115-4482-8c27-09502007cd3c	草蝦	meat-class.jpg	100	Shrimp desc	1	de171fc3-b5cb-498e-b36c-2f20d1ab8368
1fb05487-065f-4003-a4c9-60aee370c11c	鱈魚	meat-class.jpg	200	Fish desc	1	de171fc3-b5cb-498e-b36c-2f20d1ab8368
c0752fee-067f-44ee-a885-098011d4e433	麻辣鍋	meat-class.jpg	120	Spicy desc	1	aca7d5e4-52f9-421f-9b15-0f4aa12422d6
4570a5a6-595e-459e-930e-cf30275208eb	臭臭鍋	meat-class.jpg	110	Bad smell desc	1	aca7d5e4-52f9-421f-9b15-0f4aa12422d6
c2168b2b-09fe-4576-bee2-73437b4e9b70	番茄鍋	meat-class.jpg	100	Tomato desc	0	aca7d5e4-52f9-421f-9b15-0f4aa12422d6
\.


--
-- Data for Name: itemclass; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.itemclass (classid, classname, imagepath, description, mealtype) FROM stdin;
9ed2071e-93b1-42bb-8687-3ccdc87decb8	肉品	meat-class.jpg	Meat desc	MEAT
2e3bcd58-8800-4c63-b1d1-b3e7649c19cb	蔬菜	meat-class.jpg	Vegetable desc	VEGETABLE
01965936-0347-44a8-bf74-5e62b4fb9b3e	單點	meat-class.jpg	Independent desc	INDEPENDENT
de171fc3-b5cb-498e-b36c-2f20d1ab8368	海鮮	meat-class.jpg	Seafood desc	SEAFOOD
aca7d5e4-52f9-421f-9b15-0f4aa12422d6	火鍋	meat-class.jpg	Hotpot desc	HOTPOT
\.


--
-- Data for Name: seatmap; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.seatmap (mapid, name, width, height) FROM stdin;
4cd7c00c-cf6e-4cdc-afbb-c3b1c8b013b3	floor1	600	400
daa98497-8fd5-4b6d-9711-48bed4a55f31	floor2	600	800
b7edb5ae-f06e-44a3-94e7-ec7518ded66b	floor3	1200	1800
79f6839c-1114-4c60-abb7-c345d06200dd	floor4	1200	1800
42dd744d-086a-4a77-b474-16608fd55683	floor5	1000	1000
26fee88e-ed21-42d4-8789-a5abf7545b7e	floor6	200	1000
\.


--
-- Data for Name: userinfo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.userinfo (username, password) FROM stdin;
user01	sha1$5de293ab$1$1c97504a2e68ca7dccf3369c8ee718c1e94dac72
admin	sha1$f999c9f4$1$d99dd52df8a5ecf1b20d2b82934c5d027f2527e9
\.


--
-- Data for Name: userrole; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.userrole (username, role) FROM stdin;
admin	ADMIN
admin	STAFF
user01	STAFF
\.


--
-- Name: booking booking_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT booking_pkey PRIMARY KEY (bookingid);


--
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (customerid);


--
-- Name: furnish furnish_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.furnish
    ADD CONSTRAINT furnish_name_key UNIQUE (name);


--
-- Name: furnish furnish_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.furnish
    ADD CONSTRAINT furnish_pkey PRIMARY KEY (furnishid);


--
-- Name: furnishclass furnishclass_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.furnishclass
    ADD CONSTRAINT furnishclass_name_key UNIQUE (name);


--
-- Name: furnishclass furnishclass_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.furnishclass
    ADD CONSTRAINT furnishclass_pkey PRIMARY KEY (classid);


--
-- Name: item item_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_name_key UNIQUE (name);


--
-- Name: item item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (itemid);


--
-- Name: itemclass itemclass_classname_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.itemclass
    ADD CONSTRAINT itemclass_classname_key UNIQUE (classname);


--
-- Name: itemclass itemclass_mealtype_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.itemclass
    ADD CONSTRAINT itemclass_mealtype_key UNIQUE (mealtype);


--
-- Name: itemclass itemclass_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.itemclass
    ADD CONSTRAINT itemclass_pkey PRIMARY KEY (classid);


--
-- Name: seatmap seatmap_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seatmap
    ADD CONSTRAINT seatmap_pkey PRIMARY KEY (mapid);


--
-- Name: userinfo userinfo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userinfo
    ADD CONSTRAINT userinfo_pkey PRIMARY KEY (username);


--
-- Name: userrole userrole_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userrole
    ADD CONSTRAINT userrole_pkey PRIMARY KEY (username, role);


--
-- Name: booking booking_customerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT booking_customerid_fkey FOREIGN KEY (customerid) REFERENCES public.customer(customerid) ON UPDATE CASCADE;


--
-- Name: booking booking_itemid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT booking_itemid_fkey FOREIGN KEY (itemid) REFERENCES public.item(itemid) ON UPDATE CASCADE;


--
-- Name: customer customer_furnish_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_furnish_fkey FOREIGN KEY (furnish) REFERENCES public.furnish(furnishid) ON UPDATE CASCADE;


--
-- Name: customer deletecustomer_furnish_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT deletecustomer_furnish_fkey FOREIGN KEY (furnish) REFERENCES public.furnish(furnishid) ON DELETE SET NULL;


--
-- Name: furnish furnish_furnishclass_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.furnish
    ADD CONSTRAINT furnish_furnishclass_fkey FOREIGN KEY (furnishclass) REFERENCES public.furnishclass(classid) ON UPDATE CASCADE;


--
-- Name: furnish furnish_mapid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.furnish
    ADD CONSTRAINT furnish_mapid_fkey FOREIGN KEY (mapid) REFERENCES public.seatmap(mapid) ON UPDATE CASCADE;


--
-- Name: item item_classid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_classid_fkey FOREIGN KEY (classid) REFERENCES public.itemclass(classid) ON UPDATE CASCADE;


--
-- Name: userrole userrole_username_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userrole
    ADD CONSTRAINT userrole_username_fkey FOREIGN KEY (username) REFERENCES public.userinfo(username) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

