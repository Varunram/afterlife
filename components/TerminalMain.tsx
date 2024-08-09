"use client";

import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import "../app/globals.css";

// Terminal Styles
const terminalStyles = {
  terminalContainer: {
    border: "1px solid",
    borderRadius: "8px",
    overflow: "hidden",
    fontFamily: "monospace",
    display: "flex",
    flexDirection: "column",
  },
  terminalHeader: {
    padding: "10px",
    cursor: "move",
    borderBottom: "2px solid #ff8c00",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  terminalTitle: {},
  terminalBody: {
    padding: "10px",
    overflowY: "auto",
    flex: 1,
  },
  closeButton: {
    border: "none",
    cursor: "pointer",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
  },
};

// App Styles for Triangular Layout
const appStyles = {
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "75vh",
  },
  terminalTop: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  terminalBottom: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
};

interface TerminalProps {
  onClose: () => void;
}

// Terminal Styles
// ... [Rest of your code]

const GettingStartedTerminal: React.FC<TerminalProps> = ({ onClose }) => {
  const [lastErrorElement, setLastErrorElement] = useState<HTMLElement | null>(
    null
  );
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const terminalInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.innerHTML = `
                <p>Welcome to Warp!</p>
                <p>Type '<span class="clickable-command" id="help-command">help</span>' to display the commands</p>
                <div class="input-line">
                    <span class="prompt">$</span>
                    <input type="text" id="getting-started-input" autocomplete="off">
                </div>`;
      terminalInputRef.current = document.getElementById(
        "getting-started-input"
      ) as HTMLInputElement;

      // Add event listener for the help command click
      const helpCommandElement = document.getElementById('help-command');
      if (helpCommandElement) {
        helpCommandElement.addEventListener('click', () => {
          if (terminalInputRef.current) {
            terminalInputRef.current.value = 'help';
            terminalInputRef.current.focus();
          }
        });
      }
    }

    const handleEnterKey = (event: KeyboardEvent) => {
      if (
        event.key === "Enter" &&
        document.activeElement === terminalInputRef.current
      ) {
        event.preventDefault();
        const input = terminalInputRef.current?.value.trim().toLowerCase();
        if (input) {
          handleCommand(input);
        }
      }
    };

    document.addEventListener("keydown", handleEnterKey);

    return () => {
      document.removeEventListener("keydown", handleEnterKey);
    };
  }, []);

  const appendToTerminal = (text: string, isError = false, addLineGap = true) => {
    const newElement = document.createElement("p");
    newElement.innerHTML = addLineGap ? `<br>${text}` : text; // Conditionally add line gap

    if (isError) {
      newElement.classList.add("error");
      if (lastErrorElement && terminalBodyRef.current) {
        terminalBodyRef.current.removeChild(lastErrorElement);
      }
      setLastErrorElement(newElement);
    }

    if (terminalBodyRef.current) {
      terminalBodyRef.current.insertBefore(
        newElement,
        terminalBodyRef.current.lastElementChild
      );
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }

    if (isError && terminalInputRef.current) {
      terminalInputRef.current.classList.add("error");
      setTimeout(() => {
        terminalInputRef.current?.classList.remove("error");
      }, 2000);
    }
  };

  const commands: { [key: string]: () => string | void } = {
    help: () => {
      const availableCommands = Object.keys(commands)
        .filter((command) => command !== "help")
        .map((command) => `<span class="clickable-command">${command}</span>`)
        .join("<br>");
      appendToTerminal(`Available commands:<br>${availableCommands}`, false, false); // No line gap before this output
      document.querySelectorAll(".clickable-command").forEach((element) => {
        element.onclick = () => {
          if (terminalInputRef.current) {
            terminalInputRef.current.value = element.innerText;
            terminalInputRef.current.focus();
          }
        };
      });
    },
    docs: () => "Visit https://docs.joinwarp.com to get started.",
    support: () => "Email support@joinwarp.com for assistance.",
    community: () => "Join our community on Discord and GitHub.",
    start: () => {
      window.location.href = "https://www.joinwarp.com/qualification";
    },
  };
  

  const handleCommand = (input: string) => {
    const command = commands[input];
    if (command) {
      const response = command();
      if (response) appendToTerminal(response);
    } else {
      const response = `Command not found: ${input}`;
      appendToTerminal(response, true);
    }

    if (terminalInputRef.current) {
      terminalInputRef.current.value = "";
      terminalInputRef.current.focus();
    }
  };

  return (
    <Draggable handle=".terminal-header">
      <ResizableBox
        width={300}
        height={200}
        minConstraints={[150, 100]}
        maxConstraints={[600, 400]}
        resizeHandles={["se"]}
      >
        <div
          className="terminal-container"
          style={{
            ...terminalStyles.terminalContainer,
            height: "100%",
            width: "100%",
          }}
        >
          <div
            className="terminal-header"
            style={terminalStyles.terminalHeader}
          >
            <div
              className="terminal-title"
              style={terminalStyles.terminalTitle}
            >
              Getting Started
            </div>
            <button onClick={onClose} style={terminalStyles.closeButton}>
              X
            </button>
          </div>
          <div
            className="terminal-body"
            ref={terminalBodyRef}
            style={terminalStyles.terminalBody}
          ></div>
        </div>
      </ResizableBox>
    </Draggable>
  );
};

// ... [Rest of your code]

const AboutTeamTerminal: React.FC<TerminalProps> = ({ onClose }) => {
  const [lastErrorElement, setLastErrorElement] = useState<HTMLElement | null>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const terminalInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.innerHTML = `
        <p>Type '<span class="clickable-command" id="about-command">about</span>' to know about the team</p>
        <div class="input-line">
            <span class="prompt">$</span>
            <input type="text" id="about-team-input" autocomplete="off">
        </div>`;
      terminalInputRef.current = document.getElementById(
        "about-team-input"
      ) as HTMLInputElement;

      // Add event listener for the about command click
      const aboutCommandElement = document.getElementById("about-command");
      if (aboutCommandElement) {
        aboutCommandElement.addEventListener("click", () => {
          if (terminalInputRef.current) {
            terminalInputRef.current.value = "about";
            terminalInputRef.current.focus();
          }
        });
      }
    }

    const handleEnterKey = (event: KeyboardEvent) => {
      if (event.key === "Enter" && document.activeElement === terminalInputRef.current) {
        event.preventDefault();
        const input = terminalInputRef.current?.value.trim().toLowerCase();
        if (input) {
          handleCommand(input);
        }
      }
    };

    document.addEventListener("keydown", handleEnterKey);

    return () => {
      document.removeEventListener("keydown", handleEnterKey);
    };
  }, []);

  const appendToTerminal = (text: string, isError = false, addLineGap = true) => {
    const newElement = document.createElement("p");
    newElement.innerHTML = addLineGap ? `<br>${text}` : text; // Conditionally add line gap

    if (isError) {
      newElement.classList.add("error");
      if (lastErrorElement && terminalBodyRef.current) {
        terminalBodyRef.current.removeChild(lastErrorElement);
      }
      setLastErrorElement(newElement);
    }

    if (terminalBodyRef.current) {
      terminalBodyRef.current.insertBefore(
        newElement,
        terminalBodyRef.current.lastElementChild
      );
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }

    if (isError && terminalInputRef.current) {
      terminalInputRef.current.classList.add("error");
      setTimeout(() => {
        terminalInputRef.current?.classList.remove("error");
      }, 2000);
    }
  };

  const commands: { [key: string]: () => string | void } = {
    about: () => {
      const availableCommands = Object.keys(commands)
        .filter((command) => command !== "about") // Exclude 'about' from the list
        .map((command) => `<span class="clickable-command">${command}</span>`)
        .join("<br>");
      appendToTerminal(`Available commands:<br>${availableCommands}`, false, false); // No line gap before this output
      document.querySelectorAll(".clickable-command").forEach((element) => {
        element.onclick = () => {
          if (terminalInputRef.current) {
            terminalInputRef.current.value = element.innerText;
            terminalInputRef.current.focus();
          }
        };
      });
    },
    info: () => "Warp is a futuristic platform for developers.",
    team: () => "Our team consists of talented developers passionate about innovation.",
    payroll: () => "Warp offers a transparent and competitive payroll system. Do the start command to start payrolling now.",
  };

  const handleCommand = (input: string) => {
    const command = commands[input];
    if (command) {
      const response = command();
      if (response) appendToTerminal(response);
    } else {
      const response = `Command not found: ${input}`;
      appendToTerminal(response, true);
    }

    if (terminalInputRef.current) {
      terminalInputRef.current.value = "";
      terminalInputRef.current.focus();
    }
  };

  return (
    <Draggable handle=".terminal-header">
      <ResizableBox
        width={300}
        height={200}
        minConstraints={[150, 100]}
        maxConstraints={[600, 400]}
        resizeHandles={["se"]}
      >
        <div
          className="terminal-container"
          style={{
            ...terminalStyles.terminalContainer,
            height: "100%",
            width: "100%",
          }}
        >
          <div
            className="terminal-header"
            style={terminalStyles.terminalHeader}
          >
            <div
              className="terminal-title"
              style={terminalStyles.terminalTitle}
            >
              About the Team
            </div>
            <button onClick={onClose} style={terminalStyles.closeButton}>
              X
            </button>
          </div>
          <div
            className="terminal-body"
            ref={terminalBodyRef}
            style={terminalStyles.terminalBody}
          ></div>
        </div>
      </ResizableBox>
    </Draggable>
  );
};

const CareersTerminal: React.FC<TerminalProps> = ({ onClose }) => {
  const [lastErrorElement, setLastErrorElement] = useState<HTMLElement | null>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const terminalInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.innerHTML = `
        <p>Type '<span class="clickable-command" id="jobs-command">jobs</span>' to explore career opportunities</p>
        <div class="input-line">
            <span class="prompt">$</span>
            <input type="text" id="careers-input" autocomplete="off">
        </div>`;
      terminalInputRef.current = document.getElementById(
        "careers-input"
      ) as HTMLInputElement;

      // Add event listener for the jobs command click
      const jobsCommandElement = document.getElementById("jobs-command");
      if (jobsCommandElement) {
        jobsCommandElement.addEventListener("click", () => {
          if (terminalInputRef.current) {
            terminalInputRef.current.value = "jobs";
            terminalInputRef.current.focus();
          }
        });
      }
    }

    const handleEnterKey = (event: KeyboardEvent) => {
      if (event.key === "Enter" && document.activeElement === terminalInputRef.current) {
        event.preventDefault();
        const input = terminalInputRef.current?.value.trim().toLowerCase();
        if (input) {
          handleCommand(input);
        }
      }
    };

    document.addEventListener("keydown", handleEnterKey);

    return () => {
      document.removeEventListener("keydown", handleEnterKey);
    };
  }, []);

  const appendToTerminal = (text: string, isError = false, addLineGap = true) => {
    const newElement = document.createElement("p");
    newElement.innerHTML = addLineGap ? `<br>${text}` : text; // Conditionally add line gap

    if (isError) {
      newElement.classList.add("error");
      if (lastErrorElement && terminalBodyRef.current) {
        terminalBodyRef.current.removeChild(lastErrorElement);
      }
      setLastErrorElement(newElement);
    }

    if (terminalBodyRef.current) {
      terminalBodyRef.current.insertBefore(
        newElement,
        terminalBodyRef.current.lastElementChild
      );
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }

    if (isError && terminalInputRef.current) {
      terminalInputRef.current.classList.add("error");
      setTimeout(() => {
        terminalInputRef.current?.classList.remove("error");
      }, 2000);
    }
  };

  const commands: { [key: string]: () => string | void } = {
    jobs: () => {
      const availableCommands = Object.keys(commands)
        .filter(command => command !== 'jobs')
        .map(command => `<span class="clickable-command">${command}</span>`)
        .join('<br>');
      appendToTerminal(`Available commands:<br>${availableCommands}`, false, false); // No line gap before this output
      document.querySelectorAll('.clickable-command').forEach(element => {
        element.addEventListener('click', () => {
          terminalInputRef.current!.value = (element as HTMLElement).innerText;
          terminalInputRef.current!.focus();
        });
      });
    },
    careers: () => 'Explore our open positions in the Careers section.',
    apply: () => 'Visit our Careers page to apply for a position.',
    benefits: () => 'We offer comprehensive benefits to our employees.',
  };

  const handleCommand = (input: string) => {
    const command = commands[input];
    if (command) {
      const response = command();
      if (response) appendToTerminal(response);
    } else {
      const response = `Command not found: ${input}`;
      appendToTerminal(response, true);
    }

    if (terminalInputRef.current) {
      terminalInputRef.current.value = "";
      terminalInputRef.current.focus();
    }
  };

  return (
    <Draggable handle=".terminal-header">
      <ResizableBox
        width={300}
        height={200}
        minConstraints={[150, 100]}
        maxConstraints={[600, 400]}
        resizeHandles={["se"]}
      >
        <div
          className="terminal-container"
          style={{
            ...terminalStyles.terminalContainer,
            height: "100%",
            width: "100%",
          }}
        >
          <div
            className="terminal-header"
            style={terminalStyles.terminalHeader}
          >
            <div
              className="terminal-title"
              style={terminalStyles.terminalTitle}
            >
              Careers
            </div>
            <button onClick={onClose} style={terminalStyles.closeButton}>
              X
            </button>
          </div>
          <div
            className="terminal-body"
            ref={terminalBodyRef}
            style={terminalStyles.terminalBody}
          ></div>
        </div>
      </ResizableBox>
    </Draggable>
  );
};

const MemeTerminal: React.FC<TerminalProps> = ({ onClose }) => {
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const terminalInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.innerHTML = `
        <pre>⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢰⣿⡿⠗⠀⠠⠄⡀⠀⠀⠀⠀
⠀⠀⠀⠀⡜⠁⠀⠀⠀⠀⠀⠈⠑⢶⣶⡄
⢀⣶⣦⣸⠀⢼⣟⡇⠀⠀⢀⣀⠀⠘⡿⠃
⠀⢿⣿⣿⣄⠒⠀⠠⢶⡂⢫⣿⢇⢀⠃⠀
⠀⠈⠻⣿⣿⣿⣶⣤⣀⣀⣀⣂⡠⠊⠀⠀
⠀⠀⠀⠃⠀⠀⠉⠙⠛⠿⣿⣿⣧⠀⠀⠀
⠀⠀⠘⡀⠀⠀⠀⠀⠀⠀⠘⣿⣿⡇⠀⠀
⠀⠀⠀⣷⣄⡀⠀⠀⠀⢀⣴⡟⠿⠃⠀⠀
⠀⠀⠀⢻⣿⣿⠉⠉⢹⣿⣿⠁⠀⠀⠀⠀
⠀⠀⠀⠀⠉⠁⠀⠀⠀⠉⠁⠀⠀⠀⠀⠀</pre>
        <p>Welcome to the Meme Terminal! Type '<span class="clickable-command" id="me-command">me</span>' for available commands.</p>
        <div class="input-line">
            <span class="prompt">$</span>
            <input type="text" id="meme-input" autocomplete="off">
        </div>`;
      terminalInputRef.current = document.getElementById("meme-input") as HTMLInputElement;

      // Add event listener for the me command click
      const meCommandElement = document.getElementById("me-command");
      if (meCommandElement) {
        meCommandElement.addEventListener("click", () => {
          if (terminalInputRef.current) {
            terminalInputRef.current.value = "me";
            terminalInputRef.current.focus();
          }
        });
      }
    }

    const handleEnterKey = (event: KeyboardEvent) => {
      if (event.key === "Enter" && document.activeElement === terminalInputRef.current) {
        event.preventDefault();
        const input = terminalInputRef.current?.value.trim().toLowerCase();
        if (input) {
          handleCommand(input);
        }
      }
    };

    document.addEventListener("keydown", handleEnterKey);

    return () => {
      document.removeEventListener("keydown", handleEnterKey);
    };
  }, []);

  const appendToTerminal = (text: string) => {
    const newElement = document.createElement("p");
    newElement.innerHTML = text;

    if (terminalBodyRef.current) {
      terminalBodyRef.current.insertBefore(
        newElement,
        terminalBodyRef.current.lastElementChild
      );
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  };

  const commands: { [key: string]: () => string | void } = {
    me: () => {
      const availableCommands = Object.keys(commands)
        .filter((command) => command !== "me")
        .map((command) => `<span class="clickable-command">${command}</span>`)
        .join("<br>");
      appendToTerminal(`Available commands:<br>${availableCommands}`);
      document.querySelectorAll(".clickable-command").forEach((element) => {
        element.addEventListener("click", () => {
          if (terminalInputRef.current) {
            terminalInputRef.current.value = element.innerText;
            terminalInputRef.current.focus();
          }
        });
      });
    },
    joke: () => "Why do programmers prefer dark mode? Because the light attracts bugs!",
    meme: () => {
      const memes = [
        "https://i.imgflip.com/8zstno.jpg",
      ];
      const randomMeme = memes[Math.floor(Math.random() * memes.length)];
      return `<img src="${randomMeme}" alt="Meme" style="max-width:100%; width: 200px; height: 400px;">`;
    },
    return: () => onClose(),
  };

  const handleCommand = (input: string) => {
    const command = commands[input];
    if (command) {
      const response = command();
      if (response) appendToTerminal(response);
    } else {
      appendToTerminal(`Command not found: ${input}`, true);
    }

    if (terminalInputRef.current) {
      terminalInputRef.current.value = "";
      terminalInputRef.current.focus();
    }
  };

  return (
    <div
      className="terminal-container"
      style={{
        ...terminalStyles.terminalContainer,
        width: "600px",
        height: "400px",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="terminal-header" style={terminalStyles.terminalHeader}>
        <div className="terminal-title" style={terminalStyles.terminalTitle}>
          Meme Terminal
        </div>
        <button onClick={onClose} style={terminalStyles.closeButton}>
          X
        </button>
      </div>
      <div
        className="terminal-body"
        ref={terminalBodyRef}
        style={terminalStyles.terminalBody}
      ></div>
    </div>
  );
};



const TerminalMain: React.FC = () => {
  const [showGettingStartedTerminal, setShowGettingStartedTerminal] =
    useState<boolean>(true);
  const [showAboutTeamTerminal, setShowAboutTeamTerminal] =
    useState<boolean>(true);
  const [showCareersTerminal, setShowCareersTerminal] =
    useState<boolean>(true);
  const [showMemeTerminal, setShowMemeTerminal] = useState<boolean>(false);

  useEffect(() => {
    if (
      !showGettingStartedTerminal &&
      !showAboutTeamTerminal &&
      !showCareersTerminal
    ) {
      setShowMemeTerminal(true);
    }
  }, [
    showGettingStartedTerminal,
    showAboutTeamTerminal,
    showCareersTerminal,
  ]);

  return (
    <main style={appStyles.main}>
      <div style={appStyles.terminalTop}>
        {showGettingStartedTerminal && (
          <GettingStartedTerminal
            onClose={() => setShowGettingStartedTerminal(false)}
          />
        )}
      </div>
      <div style={appStyles.terminalBottom}>
        {showAboutTeamTerminal && (
          <AboutTeamTerminal onClose={() => setShowAboutTeamTerminal(false)} />
        )}
        {showCareersTerminal && (
          <CareersTerminal
            onClose={() => setShowCareersTerminal(false)}
          />
        )}
      </div>
      {showMemeTerminal && (
        <MemeTerminal
          onClose={() => {
            setShowMemeTerminal(false);
            setShowGettingStartedTerminal(true);
            setShowAboutTeamTerminal(true);
            setShowCareersTerminal(true);
          }}
        />
      )}
    </main>
  );
};



export default TerminalMain;
