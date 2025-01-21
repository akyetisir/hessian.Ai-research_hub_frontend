import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [FormsModule, CommonModule, NgFor, NgIf],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.less'
})
export class ChatBoxComponent {
  userMessage: string = '';
  messages: { sender: string, text: string }[] = [
    { sender: 'bot', text: 'Ask a question about the paper' }
  ]; // history of messages

  sendMessage(): void {
    if (this.userMessage.trim() === '') {
      return;
    }
    // Add user message to history
    this.messages.push({ sender: 'user', text: this.userMessage });
    
    // Add bot response to history
    this.messages.push({ sender: 'bot', text: 'I received your message: "' + this.userMessage + '"' });
    
    this.userMessage = '';
    
    // scroll to newest message
    setTimeout(() => {
      const messagesContainer = document.querySelector('.chatbot-messages')!;
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 100);
  }

}
