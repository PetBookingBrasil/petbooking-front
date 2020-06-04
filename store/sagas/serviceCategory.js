import { takeLatest, call, put, all, select } from "redux-saga/effects";
import { toast } from "react-toastify";
import api from "../../services/api";
import ServiceCategoryActions from "../reducers/serviceCategory";
import { ServiceCategorySelectors } from "../reducers/serviceCategory";

export function* index({ data }) {
  const params = yield select(ServiceCategorySelectors.serviceCategory);
  const response = yield call(api.serviceCategories, params);
  if (response.ok) {
    yield put(ServiceCategoryActions.serviceCategoriesSuccess(response.data));
  } else {
    yield put(ServiceCategoryActions.serviceCategoriesFailure(response.data));
  }
}

export function* create({ data }) {
  const response = yield call(api.createServiceCategory, data);
  if (response.ok) {
    toast.success("Categoria criada com sucesso!");
    yield put(
      ServiceCategoryActions.createServiceCategorySuccess(response.data)
    );
  } else {
    toast.error(
      "Ops, ocorreu um erro ao criar sua categoria, por favor, tente novamente"
    );
    yield put(
      ServiceCategoryActions.createServiceCategoryFailure(response.data)
    );
  }
}

export default all([
  takeLatest("SERVICE_CATEGORIES_REQUEST", index),
  takeLatest("CREATE_SERVICE_CATEGORY_REQUEST", create),
]);
