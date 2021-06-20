import axios from "axios";
import React from "react";
import Modal from "react-modal";
import timeStampToDate from "timestamp-to-date";
import moment from "moment";
import {
  LogoutIcon,
  XIcon,
  RefreshIcon,
  TrashIcon,
  SearchIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import Task from "../components/Task";
import DeleteModal from "../components/PromptModal";
import logo from "../components/images/Icon.png";
import AddPartnerModal from "../components/AddPartnerModal";

Modal.setAppElement("#root");

class Shared extends React.Component {
  constructor(props) {
    super();
    this.state = {
      notes: [],
      noteText: "Create Note!",
      modalOpen: false,
      title: "",
      body: "",
      image: "",
      email: "",
      posterror: "",
      isOpen: false,
      promptModalOpen: false,
      gettingNotes: true,
      noNotesYet: false,
      partnerOpen: false,
    };

    this.refresh = this.refresh.bind(this);
    this.yesPartner = this.yesPartner.bind(this);
  }

  refresh() {
    // GET NEW TASKS
    const client = JSON.parse(localStorage.getItem("client"));
    this.setState({ email: client.email });
    if (client.partner) {
      if (client.partner.length > 3) {
        axios
          .post("http://localhost:9000/", {
            email: client.partner,
          })
          .then((res) => {
            console.log(res);
            this.setState({
              notes: res.data,
              gettingNotes: false,
            });
            if (res.data.length < 1) {
              this.setState({ noNotesYet: true });
            }
          });
      }
    }
  }

  componentDidMount() {
    this.refresh();
  }

  // Closes the partner model
  yesPartner() {
    this.setState({ partnerOpen: false });
  }

  render() {
    const client = JSON.parse(localStorage.getItem("client"));

    if (!localStorage.getItem("client")) {
      window.location = "/";
    }

    const unPartner = () => {
      axios
        .post("http://localhost:9000//unpartner", {
          email: client.email,
          email2: client.partner,
        })
        .then((res) => {
          const data = {
            email: client.email,
            name: client.name,
          };
          localStorage.setItem("client", JSON.stringify(data));
          window.location = "/shared";
          console.log(res);
        });
    };

    const modalOpenClosed = () => {
      this.setState({ promptModalOpen: !this.state.promptModalOpen });
    };

    return (
      <div className="lg:grid grid-cols-7 h-screen">
        <div className="col-span-2 lg:grid hidden  shadow ">
          <div className="p-5 mt-6  h-full ">
            <img src={logo} alt="logo" className="h-10" />
            {/* Search */}
            <div className="mt-10">
              <div className="flex items-center group p-1 shadow mr-2 w-full">
                <input
                  placeholder="search notes"
                  className="py-2 px-4 flex-1 "
                  style={{
                    borderWidth: "0px",
                    borderColor: "transparent",
                    borderStyle: "none",
                  }}
                />
                <button>
                  <SearchIcon className="h-6 text-gray-500 px-2 " />
                </button>
              </div>
            </div>
            <div className="mt-4 flex flex-col">
              <Link className="flex  mb-4 p-2 bg-gray-100 rounded  " to="/">
                <p className="font-bold">My Notes</p>
              </Link>
              <Link
                className="flex  mb-4 p-2 bg-gray-50 rounded  "
                to="/shared"
              >
                <p>Shared Notes</p>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-span-5">
          <div className="p-4 flex shadow w-full">
            {/* User */}
            <div className=" flex-1  ">
              <div className="cursor-pointer flex justify-between text-white font-mono items-center">
                <p className="text-black font-bold">
                  {this.state.notes.length === 1
                    ? this.state.notes.length + ` Note`
                    : null}
                  {this.state.notes.length > 1
                    ? this.state.notes.length + ` Notes`
                    : null}
                </p>

                <div className="flex items-center">
                  <div
                    className="p-2 rounded-full bg-black mr-2 p-1 hover:bg-gray-50"
                    onClick={() => this.setState({ UserModalOpen: true })}
                  >
                    {client.profile ? (
                      <img src={client.profile} alt="profile" />
                    ) : (
                      <UserIcon className="h-6 text-white" />
                    )}
                  </div>
                  <p className="font-bold text-gray-600">{client.name}</p>
                </div>
                {/* Number of notes */}
              </div>
            </div>
          </div>

          <div className=" flex justify-between py-2 items-center p-4">
            <div>
              <p className="text-xl font-medium">
                {moment().format("dddd, D")}
              </p>
              <p className="text-sm w-full text-gray-500">
                {moment().format("MMMM")}
              </p>
            </div>

            <div className="flex">
              <div>
                {client.email ? (
                  <button
                    className="bg-red-300 rounded-md text-red-700 px-3 py-1 flex items-center gap-1"
                    onClick={() => {
                      localStorage.removeItem("client");
                      window.location = "/";
                    }}
                  >
                    <LogoutIcon className="h-5" />
                    <p>Logout</p>
                  </button>
                ) : (
                  <button
                    className="bg-gray-500 rounded-md text-white px-3 py-1"
                    onClick={() => (window.location = "/login")}
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="mx-4 flex flex-col ">
            <div className="flex items-baseline gap-4 lg:hidden">
              <Link className="text-lg text-gray-500  cursor-pointer" to="/">
                My Notes
              </Link>
              <Link
                className=" font-semibold text-2xl cursor-pointer"
                to="/shared"
              >
                Shared Notes
              </Link>
            </div>

            <div>
              {JSON.parse(localStorage.getItem("client")).partner ? (
                <div className="flex gap-2 items-center mt-4 py-2 border-b border-t">
                  <div className="flex gap-2  items-center flex-1">
                    <p className="text-2xl rounded-full py-1 px-2.5 bg-gray-200 text-gray-700 font-bold">
                      {client.partner
                        ? client.partner.charAt(0).toUpperCase()
                        : ""}
                    </p>
                    <p>{client.partner}</p>
                  </div>
                  <button
                    onClick={() => {
                      this.setState({ promptModalOpen: true });
                    }}
                  >
                    <TrashIcon className="h-5 text-red-600" />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <div className="md:w-6/12 mx-auto">
            {client.partner ? (
              <div className="md:w-6/12 mx-auto">
                {this.state.gettingNotes === true ? (
                  <div className="flex flex-col mt-10 text-gray-black opacity-40">
                    <RefreshIcon className="h-20 " />
                    <h1 className="text-center mt-4 text-lg">Loading</h1>
                  </div>
                ) : this.state.noNotesYet === true ? (
                  <div className="flex flex-col mt-10 text-gray-black opacity-40">
                    <TrashIcon className="h-20 " />
                    <h1 className="text-center mt-4 text-lg">
                      You Partner does not have any notes at the moment
                    </h1>
                  </div>
                ) : (
                  this.state.notes.map((task) => (
                    <Task
                      title={task.title}
                      body={task.body}
                      id={task._id}
                      image={task.image}
                      key={task._id}
                      email={task.email}
                      refresh={this.refresh}
                      date={
                        task.dateAdded
                          ? moment(
                              timeStampToDate(
                                task.dateAdded,
                                "yyyy-MM-dd HH:mm"
                              )
                            ).fromNow()
                          : null
                      }
                    />
                  ))
                )}
              </div>
            ) : (
              <div className="mx-auto my-40 text-center">
                <p className="text-sm">You have not yet added a partner</p>
                <button
                  className="px-2 py-1 mt-2 text-white bg-black rounded"
                  onClick={() => this.setState({ partnerOpen: true })}
                >
                  Add Partner
                </button>
              </div>
            )}
          </div>
          {/*Add Partner Modal*/}
          <AddPartnerModal
            partnerOpen={this.state.partnerOpen}
            yesPartner={this.yesPartner}
          />
          <Modal
            isOpen={this.state.modalOpen}
            onRequestClose={() => this.setState({ modalOpen: false })}
            className=" w-screen h-screen p-4 flex flex-col bg-white md:w-9/12 mx-auto md:mt-10 md:rounded"
          >
            <div className="flex justify-between items-center mx-3 my-6">
              <p className=" text-2xl font-semibold">Create a note</p>
              <XIcon
                className="h-8 cursor-pointer"
                onClick={() => this.setState({ modalOpen: false })}
              />
            </div>
            <form
              className="flex flex-col p-4 pt-0"
              onSubmit={(e) => this.handleClick(e)}
            >
              <p className="text-red">{this.state.posterror}</p>
              <div className="w-full flex flex-col">
                <p className="text-sm">Title</p>
                <input
                  type="text"
                  className="p-2 border rounded mt-2"
                  onChange={(e) => this.setState({ title: e.target.value })}
                />
              </div>

              <div className="w-full flex flex-col my-4">
                <p className="text-sm">Image Url</p>
                <input
                  type="text"
                  className="p-2 border rounded mt-2"
                  onChange={(e) => this.setState({ image: e.target.value })}
                />
              </div>

              <div className="w-full flex flex-col">
                <p className="text-sm">Type in your main content here</p>
                <textarea
                  type="text"
                  placeholder="Type here..."
                  className="p-2 border rounded mt-2"
                  onChange={(e) => {
                    this.setState({ body: e.target.value });
                    this.setState({ posterror: "" });
                  }}
                />
              </div>

              <button
                className="bg-black rounded p-2 mt-2 text-white mb-4"
                type="submit"
                onClick={() => this.setState({ noteText: "Loading..." })}
              >
                {this.state.noteText}
              </button>
              <button onClick={() => this.setState({ modalOpen: false })}>
                Discard
              </button>
            </form>
          </Modal>
          {/* Comfirm Action Delete User */}
          <DeleteModal
            isOpen={this.state.promptModalOpen}
            setIsOpen={modalOpenClosed}
            actionAllowed={unPartner}
          />
        </div>
      </div>
    );
  }
}

export default Shared;
