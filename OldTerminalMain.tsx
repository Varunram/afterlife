// TerminalMain.tsx

'use client';

import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

// Terminal Styles with Tailwind CSS
const useTerminalStyles = (theme: string) => ({
  terminalContainer: clsx(
    'flex flex-col rounded-lg overflow-hidden font-mono border',
    {
      'bg-white text-black border-black': theme === 'light',
      'bg-black text-white border-white': theme === 'dark',
    }
  ),
  terminalHeader: clsx(
    'cursor-move p-2 flex justify-between items-center border-b-2',
    {
      'bg-white text-black border-orange-500': theme === 'light',
      'bg-black text-white border-orange-500': theme === 'dark',
    }
  ),
  closeButton: clsx(
    'bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center cursor-pointer'
  ),
  terminalBody: 'p-2 overflow-y-auto flex-1',
  menuButton: clsx(
    'bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600'
  ),
});

// Terminal Components
const GettingStartedTerminal = ({ onClose }: { onClose: () => void }) => {
  const [lastErrorElement, setLastErrorElement] = useState<HTMLParagraphElement | null>(null);
  const terminalBodyRef = React.useRef<HTMLDivElement>(null);
  const terminalInputRef = React.useRef<HTMLInputElement | null>(null);
  const { theme } = useTheme();
  const styles = useTerminalStyles(theme!);

  React.useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.innerHTML = `
        <p>Welcome to Warp!</p>
        <p>Type 'help' to display the commands</p>
        <div class="input-line">
          <span class="prompt">$</span>
          <input type="text" id="getting-started-input" autocomplete="off" class="bg-transparent border-none outline-none">
        </div>`;
      terminalInputRef.current = document.getElementById('getting-started-input') as HTMLInputElement;
    }

    const handleEnterKey = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && document.activeElement === terminalInputRef.current) {
        event.preventDefault();
        const input = terminalInputRef.current!.value.trim().toLowerCase();
        handleCommand(input);
      }
    };

    document.addEventListener('keydown', handleEnterKey);

    return () => {
      document.removeEventListener('keydown', handleEnterKey);
    };
  }, []);

  const appendToTerminal = (text: string, isError = false) => {
    const newElement = document.createElement('p');
    newElement.innerHTML = text;

    if (isError) {
      newElement.classList.add('text-red-500');
      if (lastErrorElement) {
        terminalBodyRef.current!.removeChild(lastErrorElement);
      }
      setLastErrorElement(newElement);
    }

    terminalBodyRef.current!.insertBefore(newElement, terminalBodyRef.current!.lastElementChild);
    terminalBodyRef.current!.scrollTop = terminalBodyRef.current!.scrollHeight;

    if (isError) {
      terminalInputRef.current!.classList.add('text-red-500');
      setTimeout(() => {
        terminalInputRef.current!.classList.remove('text-red-500');
      }, 2000);
    }
  };

  const commands: { [key: string]: () => string | void } = {
    help: () => {
      const availableCommands = Object.keys(commands)
        .filter(command => command !== 'help')
        .map(command => `<span class="clickable-command">${command}</span>`)
        .join('<br>');
      appendToTerminal(`Available commands:<br>${availableCommands}`);
      document.querySelectorAll('.clickable-command').forEach(element => {
        element.addEventListener('click', () => {
          terminalInputRef.current!.value = (element as HTMLElement).innerText;
          terminalInputRef.current!.focus();
        });
      });
    },
    docs: () => 'Visit https://docs.joinwarp.com to get started.',
    support: () => 'Email support@joinwarp.com for assistance.',
    community: () => 'Join our community on Discord and GitHub.',
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

    terminalInputRef.current!.value = '';
    terminalInputRef.current!.focus();
  };

  return (
    <Draggable handle=".terminal-header">
      <ResizableBox
        width={300}
        height={200}
        minConstraints={[150, 100]}
        maxConstraints={[600, 400]}
        resizeHandles={['se']}
      >
        <div className={styles.terminalContainer}>
          <div className={styles.terminalHeader}>
            <div>Getting Started</div>
            <div className={styles.closeButton} onClick={onClose}>X</div>
          </div>
          <div className={styles.terminalBody} ref={terminalBodyRef}></div>
        </div>
      </ResizableBox>
    </Draggable>
  );
};

const AboutTeamTerminal = ({ onClose }: { onClose: () => void }) => {
  const [lastErrorElement, setLastErrorElement] = useState<HTMLParagraphElement | null>(null);
  const terminalBodyRef = React.useRef<HTMLDivElement>(null);
  const terminalInputRef = React.useRef<HTMLInputElement | null>(null);
  const { theme } = useTheme();
  const styles = useTerminalStyles(theme!);

  React.useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.innerHTML = `
        <p>Type 'about' to know about the team</p>
        <div class="input-line">
          <span class="prompt">$</span>
          <input type="text" id="about-team-input" autocomplete="off" class="bg-transparent border-none outline-none">
        </div>`;
      terminalInputRef.current = document.getElementById('about-team-input') as HTMLInputElement;
    }

    const handleEnterKey = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && document.activeElement === terminalInputRef.current) {
        event.preventDefault();
        const input = terminalInputRef.current!.value.trim().toLowerCase();
        handleCommand(input);
      }
    };

    document.addEventListener('keydown', handleEnterKey);

    return () => {
      document.removeEventListener('keydown', handleEnterKey);
    };
  }, []);

  const appendToTerminal = (text: string, isError = false) => {
    const newElement = document.createElement('p');
    newElement.innerHTML = text;

    if (isError) {
      newElement.classList.add('text-red-500');
      if (lastErrorElement) {
        terminalBodyRef.current!.removeChild(lastErrorElement);
      }
      setLastErrorElement(newElement);
    }

    terminalBodyRef.current!.insertBefore(newElement, terminalBodyRef.current!.lastElementChild);
    terminalBodyRef.current!.scrollTop = terminalBodyRef.current!.scrollHeight;

    if (isError) {
      terminalInputRef.current!.classList.add('text-red-500');
      setTimeout(() => {
        terminalInputRef.current!.classList.remove('text-red-500');
      }, 2000);
    }
  };

  const commands: { [key: string]: () => string | void } = {
    about: () => {
      const availableCommands = Object.keys(commands)
        .filter(command => command !== 'about')
        .map(command => `<span class="clickable-command">${command}</span>`)
        .join('<br>');
      appendToTerminal(`Available commands:<br>${availableCommands}`);
      document.querySelectorAll('.clickable-command').forEach(element => {
        element.addEventListener('click', () => {
          terminalInputRef.current!.value = (element as HTMLElement).innerText;
          terminalInputRef.current!.focus();
        });
      });
    },
    info: () => 'Warp is a futuristic platform for developers.',
    team: () => 'Our team consists of talented developers passionate about innovation.',
    payroll: () => 'Warp offers a transparent and competitive payroll system.',
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

    terminalInputRef.current!.value = '';
    terminalInputRef.current!.focus();
  };

  return (
    <Draggable handle=".terminal-header">
      <ResizableBox
        width={300}
        height={200}
        minConstraints={[150, 100]}
        maxConstraints={[600, 400]}
        resizeHandles={['se']}
      >
        <div className={styles.terminalContainer}>
          <div className={styles.terminalHeader}>
            <div>About Team</div>
            <div className={styles.closeButton} onClick={onClose}>X</div>
          </div>
          <div className={styles.terminalBody} ref={terminalBodyRef}></div>
        </div>
      </ResizableBox>
    </Draggable>
  );
};

const CareersTerminal = ({ onClose }: { onClose: () => void }) => {
  const [lastErrorElement, setLastErrorElement] = useState<HTMLParagraphElement | null>(null);
  const terminalBodyRef = React.useRef<HTMLDivElement>(null);
  const terminalInputRef = React.useRef<HTMLInputElement | null>(null);
  const { theme } = useTheme();
  const styles = useTerminalStyles(theme!);

  React.useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.innerHTML = `
        <p>Type 'careers' to explore job opportunities</p>
        <div class="input-line">
          <span class="prompt">$</span>
          <input type="text" id="careers-input" autocomplete="off" class="bg-transparent border-none outline-none">
        </div>`;
      terminalInputRef.current = document.getElementById('careers-input') as HTMLInputElement;
    }

    const handleEnterKey = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && document.activeElement === terminalInputRef.current) {
        event.preventDefault();
        const input = terminalInputRef.current!.value.trim().toLowerCase();
        handleCommand(input);
      }
    };

    document.addEventListener('keydown', handleEnterKey);

    return () => {
      document.removeEventListener('keydown', handleEnterKey);
    };
  }, []);

  const appendToTerminal = (text: string, isError = false) => {
    const newElement = document.createElement('p');
    newElement.innerHTML = text;

    if (isError) {
      newElement.classList.add('text-red-500');
      if (lastErrorElement) {
        terminalBodyRef.current!.removeChild(lastErrorElement);
      }
      setLastErrorElement(newElement);
    }

    terminalBodyRef.current!.insertBefore(newElement, terminalBodyRef.current!.lastElementChild);
    terminalBodyRef.current!.scrollTop = terminalBodyRef.current!.scrollHeight;

    if (isError) {
      terminalInputRef.current!.classList.add('text-red-500');
      setTimeout(() => {
        terminalInputRef.current!.classList.remove('text-red-500');
      }, 2000);
    }
  };

  const commands: { [key: string]: () => string | void } = {
    careers: () => {
      const availableCommands = Object.keys(commands)
        .filter(command => command !== 'careers')
        .map(command => `<span class="clickable-command">${command}</span>`)
        .join('<br>');
      appendToTerminal(`Available commands:<br>${availableCommands}`);
      document.querySelectorAll('.clickable-command').forEach(element => {
        element.addEventListener('click', () => {
          terminalInputRef.current!.value = (element as HTMLElement).innerText;
          terminalInputRef.current!.focus();
        });
      });
    },
    jobs: () => 'Explore our open positions in the Careers section.',
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

    terminalInputRef.current!.value = '';
    terminalInputRef.current!.focus();
  };

  return (
    <Draggable handle=".terminal-header">
      <ResizableBox
        width={300}
        height={200}
        minConstraints={[150, 100]}
        maxConstraints={[600, 400]}
        resizeHandles={['se']}
      >
        <div className={styles.terminalContainer}>
          <div className={styles.terminalHeader}>
            <div>Careers</div>
            <div className={styles.closeButton} onClick={onClose}>X</div>
          </div>
          <div className={styles.terminalBody} ref={terminalBodyRef}></div>
        </div>
      </ResizableBox>
    </Draggable>
  );
};

// Meme Terminal Component
const MemeTerminal = ({ onClose }: { onClose: () => void }) => {
  const [lastErrorElement, setLastErrorElement] = useState<HTMLParagraphElement | null>(null);
  const terminalBodyRef = React.useRef<HTMLDivElement>(null);
  const terminalInputRef = React.useRef<HTMLInputElement | null>(null);
  const { theme } = useTheme();
  const styles = useTerminalStyles(theme!);

  React.useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.innerHTML = `
        <p>Welcome to the Meme Terminal! Type 'joke' for a joke, 'meme' for a meme, or 'return' to go back.</p>
        <div class="input-line">
          <span class="prompt">$</span>
          <input type="text" id="meme-input" autocomplete="off" class="bg-transparent border-none outline-none">
        </div>`;
      terminalInputRef.current = document.getElementById('meme-input') as HTMLInputElement;
    }

    const handleEnterKey = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && document.activeElement === terminalInputRef.current) {
        event.preventDefault();
        const input = terminalInputRef.current!.value.trim().toLowerCase();
        handleCommand(input);
      }
    };

    document.addEventListener('keydown', handleEnterKey);

    return () => {
      document.removeEventListener('keydown', handleEnterKey);
    };
  }, []);

  const appendToTerminal = (text: string, isError = false) => {
    const newElement = document.createElement('p');
    newElement.innerHTML = text;

    if (isError) {
      newElement.classList.add('text-red-500');
      if (lastErrorElement) {
        terminalBodyRef.current!.removeChild(lastErrorElement);
      }
      setLastErrorElement(newElement);
    }

    terminalBodyRef.current!.insertBefore(newElement, terminalBodyRef.current!.lastElementChild);
    terminalBodyRef.current!.scrollTop = terminalBodyRef.current!.scrollHeight;

    if (isError) {
      terminalInputRef.current!.classList.add('text-red-500');
      setTimeout(() => {
        terminalInputRef.current!.classList.remove('text-red-500');
      }, 2000);
    }
  };

  const commands: { [key: string]: () => string | void } = {
    joke: () => appendToTerminal('Why don’t skeletons fight each other? They don’t have the guts.'),
    meme: () => appendToTerminal('<img src="https://i.imgflip.com/30b1gx.jpg" alt="meme" class="w-full h-auto">'),
    return: onClose,
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

    terminalInputRef.current!.value = '';
    terminalInputRef.current!.focus();
  };

  return (
    <Draggable handle=".terminal-header">
      <ResizableBox
        width={300}
        height={200}
        minConstraints={[150, 100]}
        maxConstraints={[600, 400]}
        resizeHandles={['se']}
      >
        <div className={styles.terminalContainer}>
          <div className={styles.terminalHeader}>
            <div>Meme Terminal</div>
            <div className={styles.closeButton} onClick={onClose}>X</div>
          </div>
          <div className={styles.terminalBody} ref={terminalBodyRef}></div>
        </div>
      </ResizableBox>
    </Draggable>
  );
};

// Main Terminal Container
const TerminalMain = () => {
  const [showGettingStartedTerminal, setShowGettingStartedTerminal] = useState(true);
  const [showAboutTeamTerminal, setShowAboutTeamTerminal] = useState(true);
  const [showCareersTerminal, setShowCareersTerminal] = useState(true);
  const [showMemeTerminal, setShowMemeTerminal] = useState(false);

  const closeGettingStartedTerminal = () => setShowGettingStartedTerminal(false);
  const closeAboutTeamTerminal = () => setShowAboutTeamTerminal(false);
  const closeCareersTerminal = () => setShowCareersTerminal(false);
  const openMemeTerminal = () => {
    setShowMemeTerminal(true);
    setShowGettingStartedTerminal(false);
    setShowAboutTeamTerminal(false);
    setShowCareersTerminal(false);
  };
  const closeMemeTerminal = () => {
    setShowMemeTerminal(false);
    setShowGettingStartedTerminal(true);
    setShowAboutTeamTerminal(true);
    setShowCareersTerminal(true);
  };

  React.useEffect(() => {
    if (!showGettingStartedTerminal && !showAboutTeamTerminal && !showCareersTerminal) {
      openMemeTerminal();
    }
  }, [showGettingStartedTerminal, showAboutTeamTerminal, showCareersTerminal]);

  return (
    <div className="relative w-full h-full">
      <div className="flex justify-center space-x-4 mt-4">
        <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          onClick={() => setShowGettingStartedTerminal(true)}
        >
          Getting Started
        </button>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          onClick={() => setShowAboutTeamTerminal(true)}
        >
          About
        </button>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          onClick={() => setShowCareersTerminal(true)}
        >
          Careers
        </button>
      </div>

      {showGettingStartedTerminal && <GettingStartedTerminal onClose={closeGettingStartedTerminal} />}
      {showAboutTeamTerminal && <AboutTeamTerminal onClose={closeAboutTeamTerminal} />}
      {showCareersTerminal && <CareersTerminal onClose={closeCareersTerminal} />}
      {showMemeTerminal && <MemeTerminal onClose={closeMemeTerminal} />}
    </div>
  );
};

export default TerminalMain;
