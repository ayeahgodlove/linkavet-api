import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "redux/store";
import {
  addDocumentSuccess,
  editDocumentSuccess,
  fetchDocumentsAsync,
  setActiveDocument,
} from "../redux/document.slice";
import { DocumentService } from "services/document.service";
import { IDocument } from "models/document";
const useDocument = () => {
  const documents = useSelector<IRootState, IDocument[]>((state) => state.document.documents);
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.document.isLoading
  );
  const initialFetch = useSelector<IRootState, boolean>(
    (state) => state.document.initialFetch
  );
  const document = useSelector<IRootState, IDocument>((state) => state.document.document);

  const dispatch = useDispatch();

  const loadDocuments = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchDocumentsAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addDocument = async (document: IDocument) => {
    return await DocumentService.create(document)
      .then((documentResponse) => {
        dispatch(addDocumentSuccess(documentResponse.data));
        return true;
      })
      .catch((error) => {
        console.log(error)
        return false;
      });
  };

  const setDocument = (document: IDocument) => {
    dispatch(setActiveDocument(document));
  };

  const editDocument = async (document: IDocument) => {
    return await DocumentService.update(document)
      .then((documentResponse) => {
        dispatch(editDocumentSuccess(documentResponse.data));
        setDocument(documentResponse.data);
        return true;
      })
      .catch((error) => {
        console.log(error)
        return false;
      });
  };

  useEffect(() => {
    loadDocuments();
  }, [document, documents, isLoading, initialFetch, loadDocuments]);

  return {
    document,
    documents,
    isLoading,
    initialFetch,
    addDocument,
    editDocument,
    setDocument,
  };
};

export { useDocument };
