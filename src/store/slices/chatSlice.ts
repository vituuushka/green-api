import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"


interface Message {
    idMessage: string,
    textMessage: string,
    timestamp: number,
    isIncoming: boolean

}
interface AuthState {
    idInstance: number | null,
    apiTokenInstance: string,
    chatId: string,
    
}
interface ChatState {
    
    messages: Message[],
    loading: boolean,
    error: string | null
}
const initialAuthState: AuthState = {
    idInstance: 0,
    apiTokenInstance: '',
    chatId: '',
    
}
const initialChatState: ChatState = {
    
    messages: [],
    loading: false,
    error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ idInstance: number; apiTokenInstance: string }>) => {
      debugger
      state.idInstance = action.payload.idInstance;
      state.apiTokenInstance = action.payload.apiTokenInstance;
      debugger
    },
    setChatId: (state, action: PayloadAction<string>) => {
      debugger
      state.chatId = action.payload;
    },
  },
});

// export const fetchMessages = createAsyncThunk<[]>(
//     'chat/fetchMessages',
//     async () => {
//       const response = await axios.get('https://your-api.com/get-messages');
//       return response.data;
//     }
//   );
  
export const sendMessage = createAsyncThunk<
  Message,
  { message: string},
  { state: RootState }
>('chat/sendMessage', async ({ message}, {getState}) => {
  const state = getState()
  const idInstance = state.auth.idInstance
  const apiTokenInstance = state.auth.apiTokenInstance
  const chatId = state.auth.chatId
  debugger
  const response = await axios.post(`https://1103.api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, { chatId, message });
  debugger
  return {
    idMessage: response.data.idMessage,
    timestamp: (new Date()).getTime(),
    textMessage: message,
    isIncoming: false,
  }
});
const chatSlice = createSlice({
    name: 'chat',
    initialState: initialChatState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // .addCase(fetchMessages.pending, (state) => {
        //   state.loading = true;
        //   state.error = null;
        // })
        // .addCase(fetchMessages.fulfilled, (state, action: PayloadAction<[]>) => {
        //   state.loading = false;
        //   state.messages = action.payload;
        // })
        // .addCase(fetchMessages.rejected, (state, action) => {
        //   state.loading = false;
        //   state.error = action.error.message ?? 'Ошибка загрузки';
        // })
        
        .addCase(sendMessage.fulfilled, (state, action: PayloadAction<Message>) => {
          state.messages.push(action.payload);
        });
    },
  });
  
  export const { setCredentials, setChatId } = authSlice.actions;
  
  export const authReducer = authSlice.reducer;
  export const chatReducer = chatSlice.reducer;