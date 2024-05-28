import React from 'react';
import RNApkInstaller from '@dominicvonk/react-native-apk-installer';
import {
  Button,
  ButtonText,
  CloseIcon,
  Heading,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from '@gluestack-ui/themed';
import { useRef, useState } from 'react';
// import CircularProgress from 'react-native-circular-progress-indicator';
import DeviceInfo from 'react-native-device-info';
import RNFS from 'react-native-fs';
import Toast from 'react-native-toast-message';
import { v4 as uuidV4 } from 'uuid';
import { Config } from '../../../config';
import { useFetchStoreQuery } from '../../../api';

export const UpdateAppVersion = () => {
  const [focusedElement, setFocusedElement] = useState<string | null>(null);
  const currentAppVersion = DeviceInfo.getVersion();

  const [showModal, setShowModal] = useState(true);
  const [percent, setPercent] = useState<number>(0);

  const { data } = useFetchStoreQuery();

  const latestAppVersion = data?.version;
  const ref = useRef(null);

  const appUrl = data?.url
    ? Config.STORAGE_BASE_URL + '/' + data?.url
    : undefined;

  if (!latestAppVersion || !appUrl || currentAppVersion !== latestAppVersion) {
    return null;
  }

  const handlePress = async () => {
    const filePath = RNFS.DocumentDirectoryPath + '/' + uuidV4() + '.apk';
    const download = RNFS.downloadFile({
      fromUrl: appUrl,
      toFile: filePath,
      progress: res => {
        const currentPercent =
          +(res.bytesWritten / res.contentLength).toFixed(2) * 100;
        setPercent(currentPercent);
      },
      progressDivider: 1,
    });
    download.promise
      .then(result => {
        if (result.statusCode >= 400) {
          Toast.show({ text1: 'Lỗi khi tải, vui lòng thử lại' });
          return;
        }
        RNApkInstaller.install(filePath);
      })
      .finally(() => {
        setPercent(0);
      });
  };

  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        setShowModal(showModal);
      }}
      finalFocusRef={ref}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">Xview store</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text>Đã có phiên bản mới của Xview store. Bạn có muốn tải về?</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            size="sm"
            action="secondary"
            mr="$3"
            onPress={() => {
              setShowModal(false);
            }}
            onFocus={() => {
              setFocusedElement('cancel');
            }}
            borderColor={
              focusedElement === 'cancel' ? '$textDark900' : undefined
            }
            borderWidth={focusedElement === 'cancel' ? 2 : undefined}>
            <ButtonText>Huỷ</ButtonText>
          </Button>
          <Button
            size="sm"
            action="positive"
            onPress={handlePress}
            borderColor={
              focusedElement === 'submit' ? '$textDark900' : undefined
            }
            borderWidth={focusedElement === 'submit' ? 2 : undefined}
            onFocus={() => {
              setFocusedElement('submit');
            }}
            disabled={!!percent}>
            <ButtonText>{percent ? 'Đang tải' : 'Tải về'}</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
