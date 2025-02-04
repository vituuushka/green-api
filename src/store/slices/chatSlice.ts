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
    inComingMessages: Message[],
    OutGoingMessages: Message[],
    loading: boolean,
    error: string | null
}
const initialAuthState: AuthState = {
    idInstance: 0,
    apiTokenInstance: '',
    chatId: '',
    
}
const initialChatState: ChatState = {
    inComingMessages: [],
    OutGoingMessages: [],
    loading: false,
    error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ idInstance: number; apiTokenInstance: string }>) => {
      
      state.idInstance = action.payload.idInstance;
      state.apiTokenInstance = action.payload.apiTokenInstance;
      
    },
    setChatId: (state, action: PayloadAction<string>) => {
     
      state.chatId = action.payload;
    },
  },
});

export const getInComingMessages = createAsyncThunk<
Message[],
{},
{ state: RootState }
>('chat/getMessages', async ({ }, {getState}) => {
      const state = getState()
  const idInstance = state.auth.idInstance
  const apiTokenInstance = state.auth.apiTokenInstance
  const chatId = state.auth.chatId
      const response = await axios.get<{
        textMessage: string,
        idMessage: string,
        chatId: string,
        timestamp: number

      }[]>(`https://1103.api.green-api.com/waInstance${idInstance}/lastIncomingMessages/${apiTokenInstance}?minutes=10`);
      debugger
      const res = response.data;
      const filteredInComing = res.filter((m) => {
        const sfsd = m.chatId ===chatId
        debugger
        return sfsd
      })
      debugger
      const inComing = filteredInComing.map((m) => {
        return {idMessage: m.idMessage,
        timestamp: m.timestamp,
        textMessage: m.textMessage,
        isIncoming: true}})
        debugger
      return inComing
    }
  
  );
  
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
        .addCase(getInComingMessages.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getInComingMessages.fulfilled, (state, action: PayloadAction<Message[]>) => {
          state.loading = false;
          state.inComingMessages = action.payload;
        })
        .addCase(getInComingMessages.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message ?? 'Ошибка загрузки';
        })
        // .addCase(getMessages.pending, (state) => {
        //   state.loading = true;
        //   state.error = null;
        // })
        // .addCase(getMessages.fulfilled, (state, action: PayloadAction<[]>) => {
        //   state.loading = false;
        //   state.messages = action.payload;
        // })
        // .addCase(getMessages.rejected, (state, action) => {
        //   state.loading = false;
        //   state.error = action.error.message ?? 'Ошибка загрузки';
        // })
        
        // .addCase(sendMessage.fulfilled, (state, action: PayloadAction<Message>) => {
        //   state.messages.push(action.payload);
        // });
    },
  });
  
  export const { setCredentials, setChatId } = authSlice.actions;
  
  export const authReducer = authSlice.reducer;
  export const chatReducer = chatSlice.reducer;